<h2 align="center"> Processamento Assíncrono: Aplicação  </h2>
<p align="center">  Desafio Backend BTG Pactual (07/2024)</p>

<hr>

## Detalhes:
    1.0: Serviço "Customers"
    
        - 1.1: Responsável pela criação de produtos, clientes e pedidos de clientes.

        - 1.2: Dados sobre o pedido são armazenados no PostgreSQL, e então, informações do mesmo
        são enviadas por mensageria (exchange do RabbitMQ) para o serviço "orders"

    2.0: Serviço "Orders".

        - 2.1: Responsável por consumir a mensagem enviada pelo serviço "customers"

        - 2.2: Dados armazenados em memória (Redis) possuem TTL

        - 2.3: Informações sobre o pedido e a mensagem consumida são persistidas em disco

    3.0: Os serviços também se comunicam via requsição HTTP.
    
        - 3.1: CORS evita que o cliente acesse direto o serviço "orders"


## Linkedin and Gmail
<p align="center">

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/reidner-adnan-b19377210) 	[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rdn.adn00@gmail.com)

</p>


