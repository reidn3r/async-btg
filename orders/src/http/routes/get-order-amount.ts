import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { RedisReadOptions } from '../adapter/options/orders-amount-options';
import { UUIDParams } from '../adapter/schema/uuid-param-schema';

export async function GetOrderAmount(app:FastifyInstance, options:RedisReadOptions){
    app.
        withTypeProvider<ZodTypeProvider>()
        .get('/orders/amount/:id', UUIDParams, async(request,reply) => {
            const { id } = request.params;
            const { redisRead } = options;
            try{
                const amount:number|null = await redisRead.getOrdersAmount(id);
                if(!amount) throw new Error(`Service not able to found customer ${id}`);

                const response = {
                    customerId: id,
                    amount: amount,
                    date: new Date()
                }

                return reply.status(200).send({ response });
            }
            catch(err){
                throw new Error(err.message);
            }
        })

}