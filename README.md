<h2 align="center"> Processamento Assíncrono </h2>
<p align="center">  <a href="https://github.com/buildrun-tech/buildrun-desafio-backend-btg-pactual/blob/main/problem.md" target="_blank"> Desafio Backend </a>BTG Pactual (07/2024)</p>

<hr>

### Arquitetura:
<p align="center">
    <img src="https://raw.githubusercontent.com/reidn3r/async-btg/main/assets/architecture.png" alt="Software Architecture">
</p>

### Modelagem de Dados Relacional - Customer Service:
<p align="center">
    <img src="assets\customers-db.png" alt="Software Architecture">
</p>

### Modelagem de Dados Relacional - Orders Service:
<p align="center">
    <img src="assets\orders-db.png" alt="Software Architecture">
</p>


## Requisição: /create/customer
    {
        "email": "lorem@ipsum.br",
        "username": "lorem ipsum"
    }

## Requisição: /create/product
    {
        "name": "product_name"
        "value": 3150,
    }

## Requisição: /create/order
    {
        "email": "lorem@ipsum.br",
        "products": [
            {
                "name": "product_1",
                "quantity": 2
            },
            {
                "name": "product_2",
                "quantity": 1
            },
            {
                "name": "product_3",
                "quantity": 7
            }
        ]
    }

## Detalhes:
    1.0: Serviço "Customers"
    
        - 1.1: Responsável pela criação de produtos, clientes e pedidos de clientes.

        - 1.2: Dados sobre o pedido são armazenados no PostgreSQL, e então, informações do mesmo
        são enviadas por mensageria (exchange do RabbitMQ) para o serviço "orders"

    2.0: Serviço "Orders".

        - 2.1: Responsável por consumir a mensagem enviada pelo serviço "customers"

        - 2.2: Dados armazenados em memória (Redis) possuem TTL

        - 2.3: Informações sobre o pedidos mensagens consumidas dentro de um intervalo de um mês são persistidas em disco

    3.0: Os serviços também se comunicam via requsição HTTP.
    
        - 3.1: CORS evita que o cliente acesse direto o serviço "orders"


## Linkedin e Gmail
<p align="center">

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/reidner-adnan-b19377210) 	[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rdn.adn00@gmail.com)

</p>


