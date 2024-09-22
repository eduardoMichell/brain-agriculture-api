import Server from './Server';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '3000';
const server = new Server(port);

server.start();