import express, { Application } from 'express';
import producerRoutes from './routes/producerRoutes';
import errorHandler from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

class Server {
  public app: Application;
  private port: string;

  constructor(port: string) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
    this.handleErrors();
    this.swaggerSetup();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.get('/api', (req, res) => {
      res.send('Servidor está rodando!');
    });

    this.app.use('/api/produtores', producerRoutes);
  }

  private handleErrors() {
    this.app.use(errorHandler);
  }

  private swaggerSetup() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`[server] Servidor rodando na porta ${this.port}`);
    });
  }
}

export default Server;