import fastify from 'fastify';
import dotenv from 'dotenv';
import { RabbitMQ } from '../amqp/rabbitmq';
import { redis } from '../../db/redis';
dotenv.config();

import { RedisService } from './services/redis-service';

//Fastify Instance
const app = fastify();

//env. variables
const amqp_uri:string = process.env.AMQP_URI as string;
const queue:string = process.env.ORDERS_QUEUE as string;

//Services instances
const rabbitmq = new RabbitMQ(amqp_uri);
const redisService = new RedisService();

const PORT = 8000;
app.listen({ port: PORT }, async() => {
    await Promise.all([rabbitmq.start(), redis.connect()])
    await rabbitmq.consume(queue, async(message) => {
        const payload = JSON.parse(message.content.toString());
        await redisService.execute(payload);
        
    });
    console.log(`orders-service: http://localhost:${PORT}`);
})