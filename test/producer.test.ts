import { expect } from 'chai';
import sinon from 'sinon';
import ProducerService from '../src/services/producerService';
import AppError from '../src/utils/AppError';  
import Producer from '../src/models/Producer';
import Database from '../src/config/database';
import { Culturas } from '../src/models/Culturas';

describe('Producer Service - Regras de Negócio', () => {
  let producerService: ProducerService;
  let db = new Database();

  beforeEach(() => {
    producerService = new ProducerService(db);
  });

  it('Deve criar um novo produtor rural com sucesso', async () => {
    const mockProducer: Producer = {
      cpf_cnpj: '12345678901',
      nome: 'Produtor Teste',
      nome_fazenda: 'Fazenda Teste',
      cidade: 'São Paulo',
      estado: 'SP',
      area_total: 1000,
      area_agricultavel: 800,
      area_vegetacao: 200,
      culturas: [Culturas.Milho, Culturas.Cafe],
    };

    const createdProducer = await producerService.createProducer(mockProducer);

    expect(createdProducer).to.have.property('id');
    expect(createdProducer.nome).to.equal('Produtor Teste');
  });

  it('Deve lançar um erro ao tentar criar produtor com CPF inválido', async () => {
    const mockProducer: Producer = {
      cpf_cnpj: '123',
      nome: 'Produtor Teste',
      nome_fazenda: 'Fazenda Teste',
      cidade: 'São Paulo',
      estado: 'SP',
      area_total: 1000,
      area_agricultavel: 800,
      area_vegetacao: 200,
      culturas: [Culturas.Milho, Culturas.Cafe],
    };

    try {
      await producerService.createProducer(mockProducer);
    } catch (error) {
      expect(error).to.be.instanceOf(AppError);
      expect((error as AppError).message).to.equal('CPF inválido');
    }
  });

  afterEach(() => {
    sinon.restore();
  });
});
