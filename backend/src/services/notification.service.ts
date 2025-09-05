import { validate as uuidValidate } from 'uuid';
import { AppError } from '../errors/appError.js';
import { MessageDTO, StatusMensagem as StatusMessage } from '../types/notification.type.js';
import { RabbitMQService } from './rabbitmq.service.js';
import { io } from '../server.js';

export class NotificationService {
    private filaEntrada = `fila.notificacao.entrada.${process.env.NOME}`;
    private filaStatus = `fila.notificacao.status.${process.env.NOME}`;
    private statusMap = new Map<string, StatusMessage>();
    
    public async postMessage(message: MessageDTO) {
        this.validateMessage(message);

        const channel = RabbitMQService.getChannel();
        await channel.assertQueue(this.filaEntrada, { durable: true });
        channel.sendToQueue(this.filaEntrada, Buffer.from(JSON.stringify(message)));
    }

    public async publicarStatus(mensagemId: string, sucesso: boolean) {
        const status: StatusMessage = sucesso ? 'PROCESSADO_SUCESSO' : 'FALHA_PROCESSAMENTO';

        const payload = {
            mensagemId,
            status
        };

        const channel = RabbitMQService.getChannel();
        await channel.assertQueue(this.filaStatus, { durable: true });
        channel.sendToQueue(this.filaStatus, Buffer.from(JSON.stringify(payload)));

        this.statusMap.set(mensagemId, status);

        io.emit('statusAtualizado', payload);
    }

    private validateMessage(message: MessageDTO): void {
        if (!message.mensagemId || !uuidValidate(message.mensagemId)) {
            throw new AppError('mensagemId é obrigatório e deve ser um UUID válido.', 400);
        }
    
        if (!message.conteudoMensagem || message.conteudoMensagem.trim() === '') {
            throw new AppError('conteudoMensagem é obrigatório e não pode estar vazio.', 400);
        }
    }
}
