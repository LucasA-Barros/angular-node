import { NextFunction, Request, Response } from 'express';
import { NotificationService } from '../services/notification.service.js';
import { MessageDTO } from '../types/notification.type.js';

const notificationService = new NotificationService();

export const notify = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { mensagemId, conteudoMensagem } = req.body as MessageDTO;

        await notificationService.postMessage({mensagemId, conteudoMensagem});

        res.status(200).json({ status: 'sucesso', mensagem: 'Notificação enviada' });
    } catch (err) {
        next(err);
    }
};