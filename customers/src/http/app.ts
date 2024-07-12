import fastify from 'fastify';


//Fastify Instance
const app = fastify();


const PORT = 3000;
app.listen({ port: PORT }, () => {
    console.log(`customer-service: http://localhost:${PORT}`);
})