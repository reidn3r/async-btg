import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ProductSchema } from '../adapter/schema/product-schema';
import { CreateProductOptions } from '../adapter/create-product-options';

export async function CreateProduct(app:FastifyInstance, options:CreateProductOptions){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/create/product', ProductSchema, async(request, reply) => {
            const { value, name } = request.body;
            const { productServices } = options;

            const foundProduct = await productServices.findByName(name);
            if(foundProduct) throw new Error("Product already exists");

            const newProduct = await productServices.create(name, value);
            return reply.status(201).send({ message: `product ${newProduct.id} created.` });
        })
}