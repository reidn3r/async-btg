import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { OrderSchema } from '../adapter/schema/order-schema';
import { CreateOrderOptions } from '../adapter/options/create-order-options';
import { MessagePayload } from '../adapter/types/message-type';
export async function CreateOrder(app:FastifyInstance, options:CreateOrderOptions){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/create/order', OrderSchema, async(request, reply) => {
            const { email, products } = request.body;
            const { customerServices, productServices, orderServices, rabbitmq } = options;

            try{
                const [foundCustomer, orderValidation] = await Promise.all([
                    customerServices.findByEmail(email),
                    productServices.validateProducts(products)
                ])

                if(!foundCustomer) throw new Error("Customer doesn't exists");
                if(!orderValidation) throw new Error("Some product was not found in database");

                const order = await orderServices.createNewOrder(foundCustomer.id, orderValidation);
                const payload:MessagePayload = {
                    customerId: foundCustomer.id,
                    orderId: order.id,
                    items:orderValidation
                }
                const rountingKey:string = process.env.ROUTING_KEY as string;

                const published = await rabbitmq.publishExchange('amq.direct', rountingKey, JSON.stringify(payload));
                if(!published) throw new Error("Error while sending message to orders service. ");
                return reply.status(200).send({ payload });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        })
}