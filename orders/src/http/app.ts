import fastify from 'fastify';


//Fastify Instance
const app = fastify();


const PORT = 8000;
app.listen({ port: PORT }, () => {
    console.log(`orders-service: http://localhost:${PORT}`);
})