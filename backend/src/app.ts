import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';
import notificationRoutes from './routes/notification.routes.js';
import { RabbitMQService } from './services/rabbitmq.service.js';
import { iniciarConsumidor } from './consumers/notification.consumer.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/api', notificationRoutes);

app.use(errorHandler);

async function bootstrap() {
    try {
        await RabbitMQService.connect();
        await iniciarConsumidor();
        console.log('RabbitMQ conectado e consumidor iniciado');
    } catch (err) {
        console.error('Erro ao conectar RabbitMQ', err);
        process.exit(1);
    }
}

bootstrap();

export default app;