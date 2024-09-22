# Cadastro de Produtores Rurais - Backend - Brain Agriculture

Este projeto faz parte de um teste de avaliação para a Brain Agriculture, onde o objetivo é criar a **API Backend** para o cadastro de produtores rurais. O projeto foi desenvolvido utilizando **NodeJS**, **TypeScript** e **PostgreSQL** como banco de dados. A API permite cadastrar, editar, excluir e listar produtores rurais, além de fornecer dados agregados para exibição em um dashboard.

## Versões Utilizadas

- **Node.js**: v16.16.0
- **PostgreSQL**: v16.4.1

## Link para a API no Heroku

A API está hospedada no Heroku e pode ser acessada pelo seguinte link:

[https://brain-ag-agriculture-api-2f06aa15bc9b.herokuapp.com/api-docs](https://brain-ag-agriculture-api-2f06aa15bc9b.herokuapp.com/api-docs)

### Endpoints Principais

- **POST** `/api/produtores`: Cria um novo produtor rural.
- **GET** `/api/produtores`: Lista todos os produtores rurais.
- **GET** `/api/produtores/:id`: Exibe os detalhes de um produtor específico.
- **PUT** `/api/produtores/:id`: Edita os dados de um produtor existente.
- **DELETE** `/api/produtores/:id`: Exclui um produtor.
- **GET** `/api/dashboard`: Retorna os dados agregados para exibição no dashboard.

- **SWAGGER** `/api-docs`: Fornece a documentação interativa da API

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## Instalação

### Passos

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/eduardoMichell/brain-agriculture-api.git
   cd brain-agriculture-api
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure a connection string do PostgreSQL:
   - Crie um banco de dados no PostgreSQL (ex: \`brain_agriculture\`).
   - Defina a connection string no arquivo \`.env\`. Exemplo:
     \`\`\`env
    DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/brain_agriculture
     \`\`\`

4. Execute as migrações e seeds para criar e popular as tabelas:
   - **Migrations**: Cria as tabelas no banco de dados.
   - **Seeds**: Insere dados de exemplo no banco de dados.
   \`\`\`bash
   npm run migrate    
   npm run seed  
   \`\`\`

5. Inicie o servidor:
   \`\`\`bash
   npm start
   \`\`\`

### Docker

Se preferir rodar o projeto com Docker, siga os passos abaixo:

1. Certifique-se de que o Docker está instalado e rodando em sua máquina.
2. Execute o comando:
   \`\`\`bash
   npm run docker:up
   \`\`\`
3. Para derrubar os containers Docker, execute:
   \`\`\`bash
   npm run docker:down
   \`\`\`

### Arquivos SQL e TypeScript para Seed

O projeto inclui scripts para gerar os dados de produtores rurais:

- **Arquivo SQL**: Um script para criar e popular as tabelas diretamente via PostgreSQL.
  - Localizado em \`db_init/init.sql\`.
  
- **Script TypeScript**: Um script TypeScript para popular os dados via código.
  - Localizado em \`src/scripts/seedProdutores.ts\`.

## Postman

Para facilitar os testes, o projeto contém um arquivo de configuração do **Postman** que pode ser importado diretamente.

- O arquivo para importação está localizado na raiz do projeto com o nome \`brain_agriculture_api.postman_collection.json\`.

## Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configurar o banco de dados e outras opções. Aqui está um exemplo do arquivo \`.env\`:

\`\`\`env
DATABASE_URL=postgres://seu_usuario:sua_senha@localhost:5432/brain_agriculture
PORT=3000
API_URL="http://localhost:3000"
\`\`\`

## Deploy Automático

O projeto também está configurado para deploy automático no Heroku via GitHub Actions. Para cada push na branch \`master\`, a aplicação será automaticamente publicada no Heroku.