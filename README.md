<h2 align="center"> Asynchronous Processing </h2>
<p align="center">  <a href="https://github.com/buildrun-tech/buildrun-desafio-backend-btg-pactual/blob/main/problem.md" target="_blank"> Backend Challenge </a>BTG Pactual (07/2024)</p>

<hr>

### Architecture:
<p align="center">
    <img src="https://raw.githubusercontent.com/reidn3r/async-btg/main/assets/architecture.png" alt="Software Architecture">
</p>

### Relational Data Modeling - Customer Service:
<p align="center">
    <img src="assets\customers-db.png" alt="Software Architecture">
</p>

### Relational Data Modeling - Orders Service:
<p align="center">
    <img src="assets\orders-db.png" alt="Software Architecture">
</p>

## Request: /create/customer
    {
        "email": "lorem@ipsum.br",
        "username": "lorem ipsum"
    }

## Request: /create/product
    {
        "name": "product_name"
        "value": 3150,
    }

## Request: /create/order
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

## Details:
    1.0: "Customers" Service
    
        - 1.1: Assigned for creating products, customers, and customer orders.

        - 1.2: Order data is stored in PostgreSQL, and then the information is sent via messaging (RabbitMQ exchange) to the "orders" service.

    2.0: "Orders" Service.

        - 2.1: Assigned for consuming the message sent by the "customers" service.

        - 2.2: Data stored in memory (Redis) has a TTL.

        - 2.3: Information about orders and messages consumed within a month are persisted to disk.

    3.0: The services also communicate via HTTP requests.
    
        - 3.1: CORS prevents the client from directly accessing the "orders" service.

## LinkedIn and Gmail
<p align="center">

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/reidner-adnan-b19377210) 	[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rdn.adn00@gmail.com)

</p>
