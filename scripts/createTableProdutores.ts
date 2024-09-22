import Database from '../src/config/database';

const createTableProdutores = async () => {
  const db = new Database();

  const queryText = `
    CREATE TABLE IF NOT EXISTS produtores (
      id SERIAL PRIMARY KEY,
      cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
      nome VARCHAR(100) NOT NULL,
      nome_fazenda VARCHAR(100) NOT NULL,
      cidade VARCHAR(100) NOT NULL,
      estado VARCHAR(2) NOT NULL,
      area_total NUMERIC NOT NULL,
      area_agricultavel NUMERIC NOT NULL,
      area_vegetacao NUMERIC NOT NULL,
      culturas TEXT[]
    );
  `;

  try {
    await db.query(queryText);
    console.log('Tabela "produtores" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar a tabela "produtores":', err);
  } finally {
    await db.close(); 
  }
};

createTableProdutores();
