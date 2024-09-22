import { Request, Response, NextFunction } from 'express';
import ProducerService from '../services/producerService';
import Database from '../config/database';
import AppError from '../utils/AppError';

class ProducerController {
  private producerService: ProducerService;

  constructor(db: Database) {
    this.producerService = new ProducerService(db);
  }

  /**
  * @swagger
  * tags:
  *   - name: Producer
  *     description: Controller do Producer
  */

  /**
  * @swagger
  * /api/produtores:
  *   post:
  *     summary: Cria um novo produtor
  *     tags: [Producer]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Producer'
  *     responses:
  *       201:
  *         description: Produtor criado com sucesso
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Producer'
  */
  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const producer = await this.producerService.createProducer(req.body);
      return res.status(201).json({
        message: 'Produtor criado com sucesso',
        data: producer,
      });
    } catch (error) {
      next(error);
    }
  }



  /**
   * @swagger
   * /api/produtores:
   *   get:
   *     summary: Lista todos os produtores
   *     tags: [Producer]
   *     responses:
   *       200:
   *         description: Lista de produtores
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Producer'
   */
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const producers = await this.producerService.getAllProducers();
      return res.status(200).json({
        message: 'Lista de produtores',
        data: producers,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/produtores/{id}:
   *   get:
   *     summary: Busca um produtor por ID
   *     tags: [Producer]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Produtor encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Producer'
   *       404:
   *         description: Produtor não encontrado
   */
  public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const producer = await this.producerService.getProducerById(id);

      if (!producer) {
        throw new AppError(`Produtor com ID ${id} não encontrado`, 404);
      }

      return res.status(200).json({
        message: `Produtor com ID ${id} encontrado`,
        data: producer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/produtores/{id}:
   *   put:
   *     summary: Atualiza um produtor por ID
   *     tags: [Producer]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Producer'
   *     responses:
   *       200:
   *         description: Produtor atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Producer'
   */
  public async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const producer = await this.producerService.updateProducer(req.params.id, req.body);
      return res.status(200).json({
        message: 'Produtor atualizado com sucesso',
        data: producer,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/produtores/{id}:
   *   delete:
   *     summary: Deleta um produtor por ID
   *     tags: [Producer]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Produtor deletado com sucesso
   */
  public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      await this.producerService.deleteProducer(req.params.id);
      return res.status(200).json({
        message: 'Produtor deletado com sucesso',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/produtores/dashboard:
   *   get:
   *     summary: Retorna dados do dashboard
   *     tags: [Producer]
   *     responses:
   *       200:
   *         description: Dados do dashboard
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  public async getDashboard(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const dashboardData = await this.producerService.getDashboardData();
      return res.status(200).json({
        message: 'Dados do dashboard',
        data: dashboardData,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProducerController;