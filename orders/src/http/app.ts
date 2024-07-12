import fastify from 'fastify';
import dotenv from 'dotenv';
import { RabbitMQ } from '../amqp/rabbitmq';
import { redis } from '../../db/redis';
dotenv.config();

//Fastify Instance
const app = fastify();

//env. variables
const amqp_uri:string = process.env.AMQP_URI as string;
const queue:string = process.env.ORDERS_QUEUE as string;

//Services instances
const rabbitmq = new RabbitMQ(amqp_uri);

const PORT = 8000;
app.listen({ port: PORT }, async() => {
    await Promise.all([rabbitmq.start(), redis.connect()])
    await rabbitmq.consume(queue, (message) => {
        console.log(message);
    });
    console.log(`orders-service: http://localhost:${PORT}`);
})