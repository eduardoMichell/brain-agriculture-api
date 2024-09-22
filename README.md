
# Cadastro de Produtores Rurais - Backend - Brain Agriculture

Este projeto faz parte de um teste de avaliação para a Brain Agriculture, onde o objetivo é criar a **API Backend** para o cadastro de produtores rurais. O projeto foi desenvolvido utilizando **NodeJS**, **TypeScript** e **PostgreSQL** como banco de dados. A API permite cadastrar, editar, excluir e listar produtores rurais, além de fornecer dados agregados para exibição em um dashboard.
 
## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (opcional para facilitar a configuração do banco de dados)

## Instalação

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/eduardoMichell/brain-agriculture-api.git
   cd brain-agricultire-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure a connection string do PostgreSQL:
   - Crie um banco de dados no PostgreSQL (ex: `brain_agriculture`).
   - Defina a connection string no arquivo .env Exemplo:
     ```env
    DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/brain_agriculture
     ```

4. Execute as migrações e seeds:
   ```bash
   npm run migrate    
   npm run seed  
   ```

5. Inicie o servidor:
   ```bash
   npm start
   ```

### Docker

Se preferir rodar o projeto com Docker, siga os passos abaixo:

1. Certifique-se de que o Docker está instalado e rodando em sua máquina.
2. Execute o comando:
   ```bash
   docker-compose up --build
   ```

Isso irá subir tanto o backend quanto o banco de dados PostgreSQL em containers separados.

## Endpoints da API

- **POST** `/api/produtores`: Cria um novo produtor rural.
- **GET** `/api/produtores`: Lista todos os produtores rurais.
- **GET** `/api/produtores/:id`: Exibe os detalhes de um produtor específico.
- **PUT** `/api/produtores/:id`: Edita os dados de um produtor existente.
- **DELETE** `/api/produtores/:id`: Exclui um produtor.

- **GET** `/api/dashboard`: Retorna os dados agregados para exibição no dashboard.

## Testes

Para rodar os testes (se aplicável), execute:

```bash
npm test
```