import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { UUIDParams } from "../adapter/schema/uuid-param-schema";
import { RedisReadOptions } from "../adapter/options/orders-amount-options";

export async function GetOrderValue(app:FastifyInstance, options:RedisReadOptions){
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/orders/value/:id', UUIDParams, async(request, reply) => {
            const { id } = request.params;
            const { redisRead } = options;

            try{
                const data = await redisRead.getOrderValue(id);
                if(!data) throw new Error(`Order ${id} not found`);
                
                const response = {
                    id:id,
                    value:data,
                    date: new Date()
                }
                return reply.status(200).send({ response });
            }
            catch(err){
                throw new Error(err.message);
            }
        })
}