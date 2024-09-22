import { Pool } from 'pg';
import dotenv from 'dotenv';
import AppError from '../utils/AppError';
const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

class Database {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction
        ? { rejectUnauthorized: false }
        : false,
    });
  }

  public async query(queryText: string, params?: any[]) {
    try {
      return await this.pool.query(queryText, params);
    } catch (error) {
      console.error('Erro ao executar query no banco de dados:', error);
      throw new AppError('Erro ao executar query no banco de dados', 500);
    }
  }

  public async connect() {
    try {
      return this.pool.connect();
    } catch (error) {
      throw new AppError('Erro ao conectar ao banco de dados', 500);
    }
  }

  public async close() {
    try {
      await this.pool.end();
    } catch (error) {
      throw new AppError('Erro ao fechar a conexão com o banco de dados', 500);
    }
  }
}

export default Database;