import { FastifyInstance } from "fastify";
import { CustomerSchema } from '../adapter/schema/customer-schema';
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateCustomerOptions } from '../adapter/options/create-customer-options';

export async function CreateCustomer(app:FastifyInstance, options:CreateCustomerOptions) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/create/customer', CustomerSchema, async(request, reply) => {
            const { username, email } = request.body;
            const { customerServices } = options;
            
            const foundUser = await customerServices.findByUsernameEmail(username, email);
            if(foundUser) throw new Error("User already exists");

            await customerServices.create(username, email);

            return reply.status(201).send({ message: `user: ${email} created.` });
        })
}