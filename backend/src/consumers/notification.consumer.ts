import { ConsumeMessage } from 'amqplib';
import { NotificationService } from '../services/notification.service.js';
import { RabbitMQService } from '../services/rabbitmq.service.js';
import { MessageDTO } from '../types/notification.type.js';

export async function iniciarConsumidor() {
    const notificationService = new NotificationService();
    const channel = RabbitMQService.getChannel();
    const filaEntrada = `fila.notificacao.entrada.${process.env.NOME}`;

    await channel.assertQueue(filaEntrada, { durable: true });

    channel.consume(filaEntrada, async (msg: ConsumeMessage | null) => {
        if (msg) {
            const mensagem: MessageDTO = JSON.parse(msg.content.toString());

            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

            const sucesso = Math.random() > 0.2;

            await notificationService.publicarStatus(mensagem.mensagemId, sucesso);

            channel.ack(msg);

            console.log(
                `Mensagem ${mensagem.mensagemId} processada -> ${sucesso ? 'SUCESSO' : 'FALHA'}`
            );
        }
    });

    console.log(`Consumidor iniciado na fila ${filaEntrada}`);
}