import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/appError.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
}   