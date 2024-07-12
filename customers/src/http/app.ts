import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { CreateCustomer } from './routes/create-customer';
import { CreateProduct } from './routes/create-product';
import { CreateOrder } from './routes/create-order';
import { CustomerServices } from './services/customer-services';
import { OrderServices } from './services/order-services';
import { ProductServices } from './services/product-services';

//Fastify Instance
const app = fastify();

//Schema validator and serializer
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

//Services
const customerServices = new CustomerServices();
const productServices = new ProductServices();
const orderServices = new OrderServices();

//Routes
app.register(CreateCustomer, { customerServices });
app.register(CreateProduct, { productServices });
app.register(CreateOrder, { orderServices, customerServices, productServices });

const PORT:number = 3000;
app.listen({ port: PORT }, () => {
    console.log(`customer-service: http://localhost:${PORT}`);
})