import fastify from 'fastify';
import { CreateCustomer } from './routes/create-customer';
import { CreateProduct } from './routes/create-product';
import { CustomerServices } from './services/customer-services';
import { ProductServices } from './services/product-services';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

//Fastify Instance
const app = fastify();


//Schema validator and serializer
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Services
const customerServices = new CustomerServices();
const productServices = new ProductServices();

//Routes
app.register(CreateCustomer, { customerServices });
app.register(CreateProduct, { productServices });

const PORT:number = 3000;
app.listen({ port: PORT }, () => {
    console.log(`customer-service: http://localhost:${PORT}`);
})