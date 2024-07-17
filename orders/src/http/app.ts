import dotenv from 'dotenv';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { redis } from '../../db/redis';
import { RabbitMQ } from '../amqp/rabbitmq';
import { RedisRead } from './services/redis-read-data';
import { RedisStoreData } from './services/redis-store-data';
import { GetOrderAmount } from './routes/get-order-amount';
import { GetOrderValue } from './routes/get-order-value';
dotenv.config();

//env. variables
const amqp_uri:string = process.env.AMQP_URI as string;
const queue:string = process.env.ORDERS_QUEUE as string;

//Fastify Instance
const app = fastify();
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Services instances
const rabbitmq = new RabbitMQ(amqp_uri);
const redisStoreData = new RedisStoreData();
const redisRead = new RedisRead();

//routes
app.register(GetOrderAmount, { redisRead });
app.register(GetOrderValue, { redisRead });

const PORT = 8000;
app.listen({ port: PORT }, async() => {
    await Promise.all([rabbitmq.start(), redis.connect()]);
    await rabbitmq.consume(queue, async(message) => {
        const payload = JSON.parse(message.content.toString());
        await redisStoreData.execute(payload);
        
    });
    console.log(`orders-service: http://localhost:${PORT}`);
})