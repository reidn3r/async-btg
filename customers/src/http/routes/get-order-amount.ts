import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetOrderSchema } from '../adapter/schema/get-by-id-params-schema';
import axios  from 'axios';

export async function GetOrdersAmount(app:FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/customer/:id/orders/amount', GetOrderSchema, async(request, reply) => {
            try{
                const { id } = request.params;
                const response = await axios.get(`http://localhost:8000/orders/amount/${id}`)
                if(!response || response.status !== 200) throw new Error("Error in orders service");

                const data = response.data.response;
                return reply.status(200).send({ data });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        })
}