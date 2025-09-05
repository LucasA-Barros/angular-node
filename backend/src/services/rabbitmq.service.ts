import amqp, { Channel, Connection } from 'amqplib';

export class RabbitMQService {
    private static channel: Channel;

    static async connect(): Promise<Channel> {
        if (!this.channel) {
            import('dotenv').then(dotenv => dotenv.config());
            
            const url = process.env.RABBITMQ_URL;
            const nome = process.env.NOME;

            if (!url) throw new Error('RABBITMQ_URL não definida no .env');
            if (!nome) throw new Error('NOME não definida no .env');

            const connection = await amqp.connect(url);
            this.channel = await connection.createChannel();
        }
        return this.channel;
    }

    static getChannel(): Channel {
        if (!this.channel) throw new Error('RabbitMQ channel não inicializado');
        return this.channel;
    }
}
