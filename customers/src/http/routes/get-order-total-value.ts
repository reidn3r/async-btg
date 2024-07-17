import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GetOrderSchema } from '../adapter/schema/get-by-id-params-schema';
import axios  from 'axios';

export async function GetTotalOrderValue(app: FastifyInstance){

    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/order/:id/total', GetOrderSchema, async(request, reply) => {
            const { id } = request.params;
            try{
                const response = await axios.get(`http://localhost:8000/orders/value/${id}`);
                if(!response || response.status !== 200) throw new Error("Error in orders service.");

                const data = response.data.response;
                return reply.status(200).send({ data });
            }
            catch(err:any){
                throw new Error(err.message);
            }
        })
}