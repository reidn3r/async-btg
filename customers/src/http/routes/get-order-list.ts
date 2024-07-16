import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { GetOrdersListOptions } from '../adapter/options/get-orders-list';
import { GetOrderSchema } from '../adapter/schema/get-by-id-params-schema';

export async function GetOrderList(app:FastifyInstance, options:GetOrdersListOptions){
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/order/list/:id', GetOrderSchema,async(request, reply) => {
            const { id } = request.params;

            try{
                const { customerServices } = options;
                const orders = await customerServices.getOrdersByCustomerId(id);

                if(orders.length === 0) throw new Error(`No orders for this customer id: ${id}`);

                return reply.status(200).send({ orders: orders });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        })
}