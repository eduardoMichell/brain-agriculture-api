import Database from '../config/database';
import Producer from '../models/Producer';
import AppError from '../utils/AppError';
import { validateCpf, validateCnpj } from '../utils/validateCpfCnpj';
import { Culturas } from '../models/Culturas';

class ProducerService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  private validateCulturas(culturas: string[]): void {
    const validCulturas = Object.values(Culturas);
    const invalidCulturas: string[] = [];

    for (const cultura of culturas) {
      if (!validCulturas.includes(cultura as Culturas)) {
        invalidCulturas.push(cultura);
      }
    }

    if (invalidCulturas.length > 0) {
      throw new AppError(`Culturas inválidas: ${invalidCulturas.join(', ')}`, 400);
    }
  }

  private async checkIfCpfCnpjExists(cpf_cnpj: string): Promise<boolean> {
    const query = `SELECT id FROM produtores WHERE cpf_cnpj = $1;`;
    const result = await this.db.query(query, [cpf_cnpj]);
    return result.rows.length > 0;
  }

  private validateAreas(area_total: number, area_agricultavel: number, area_vegetacao: number): void {
    if (area_agricultavel + area_vegetacao > area_total) {
      throw new AppError('A soma da área agricultável e vegetação não pode ser maior que a área total', 400);
    }
  }

  public async createProducer(data: Producer): Promise<Producer> {
    if (data.cpf_cnpj.length === 11 && !validateCpf(data.cpf_cnpj)) {
      throw new AppError('CPF inválido', 400);
    } else if (data.cpf_cnpj.length === 14 && !validateCnpj(data.cpf_cnpj)) {
      throw new AppError('CNPJ inválido', 400);
    }

    const cpfCnpjExists = await this.checkIfCpfCnpjExists(data.cpf_cnpj);
    if (cpfCnpjExists) {
      throw new AppError('Já existe um produtor com este CPF/CNPJ', 400);
    }

    this.validateAreas(data.area_total, data.area_agricultavel, data.area_vegetacao);

    this.validateCulturas(data.culturas);

    const query = `
      INSERT INTO produtores (cpf_cnpj, nome, nome_fazenda, cidade, estado, area_total, area_agricultavel, area_vegetacao, culturas)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      data.cpf_cnpj, data.nome, data.nome_fazenda, data.cidade, data.estado,
      data.area_total, data.area_agricultavel, data.area_vegetacao, data.culturas,
    ];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }


  public async getAllProducers(): Promise<Producer[]> {
    const query = `SELECT * FROM produtores;`;
    const result = await this.db.query(query);
    return result.rows;
  }

  public async getProducerById(id: string) {
    const query = `SELECT * FROM produtores WHERE id = $1;`;
    const result = await this.db.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  public async updateProducer(id: string, data: Producer): Promise<Producer> {
    if (data.cpf_cnpj.length === 11 && !validateCpf(data.cpf_cnpj)) {
      throw new AppError('CPF inválido', 400);
    } else if (data.cpf_cnpj.length === 14 && !validateCnpj(data.cpf_cnpj)) {
      throw new AppError('CNPJ inválido', 400);
    }

    const cpfCnpjExists = await this.checkIfCpfCnpjExists(data.cpf_cnpj);
    if (cpfCnpjExists) {
      throw new AppError('Já existe um produtor com este CPF/CNPJ', 400);
    }

    this.validateAreas(data.area_total, data.area_agricultavel, data.area_vegetacao);

    this.validateCulturas(data.culturas);

    const query = `
      UPDATE produtores
      SET cpf_cnpj=$1, nome=$2, nome_fazenda=$3, cidade=$4, estado=$5, area_total=$6, area_agricultavel=$7, area_vegetacao=$8, culturas=$9
      WHERE id=$10
      RETURNING *;
    `;
    const values = [
      data.cpf_cnpj, data.nome, data.nome_fazenda, data.cidade, data.estado,
      data.area_total, data.area_agricultavel, data.area_vegetacao, data.culturas, id,
    ];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  public async deleteProducer(id: string): Promise<void> {
    const query = `DELETE FROM produtores WHERE id=$1;`;
    await this.db.query(query, [id]);
  }

  public async getDashboardData() {
    const totalFazendasQuery = `SELECT COUNT(*) AS total_fazendas FROM produtores;`;
    const totalHectaresQuery = `SELECT SUM(area_total) AS total_hectares FROM produtores;`;
    const fazendasPorEstadoQuery = `
      SELECT estado, COUNT(*) AS quantidade 
      FROM produtores 
      GROUP BY estado;
    `;
    const culturasPorTipoQuery = `
      SELECT unnest(culturas) AS cultura, COUNT(*) AS quantidade 
      FROM produtores 
      GROUP BY cultura;
    `;
    const usoSoloQuery = `
      SELECT SUM(area_agricultavel) AS area_agricultavel, SUM(area_vegetacao) AS area_vegetacao 
      FROM produtores;
    `;

    try {
      const totalFazendas = await this.db.query(totalFazendasQuery);
      const totalHectares = await this.db.query(totalHectaresQuery);
      const fazendasPorEstado = await this.db.query(fazendasPorEstadoQuery);
      const culturasPorTipo = await this.db.query(culturasPorTipoQuery);
      const usoSolo = await this.db.query(usoSoloQuery);


      return {
        total_fazendas: totalFazendas.rows[0].total_fazendas,
        total_hectares: totalHectares.rows[0].total_hectares,
        fazendas_por_estado: fazendasPorEstado.rows,
        culturas_por_tipo: culturasPorTipo.rows,
        uso_solo: usoSolo.rows[0]
      };
    } catch (error) {
      throw new AppError('Erro ao obter dados do dashboard', 500);
    }
  }
}

export default ProducerService;