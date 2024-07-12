import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { OrderSchema } from '../adapter/schema/order-schema';
import { CreateOrderOptions } from '../adapter/options/create-order-options';

export async function CreateOrder(app:FastifyInstance, options:CreateOrderOptions){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/create/order', OrderSchema, async(request, reply) => {
            const { email, products } = request.body;
            const { customerServices, productServices, orderServices } = options;

            const [foundCustomer, orderValidation] = await Promise.all([
                customerServices.findByEmail(email),
                productServices.validateProducts(products)
            ])

            if(!foundCustomer) throw new Error("Customer doesn't exists");
            if(!orderValidation) throw new Error("Some product was not found in database");

            const order = await orderServices.createNewOrder(foundCustomer.id, orderValidation);
            return reply.status(200).send({ order });
        })
}