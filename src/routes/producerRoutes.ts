import { Router, Request, Response, NextFunction } from 'express';
import Database from '../config/database';
import ProducerController from '../controllers/producerController';

const router = Router();
const db = new Database();
const producerController = new ProducerController(db);


router.get('/dashboard', (req: Request, res: Response, next: NextFunction) => {
  return producerController.getDashboard(req, res, next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  return producerController.getById(req, res, next);
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  return producerController.create(req, res, next);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return producerController.getAll(req, res, next);
});

router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  return producerController.update(req, res, next);
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  return producerController.delete(req, res, next);
});

export default router;