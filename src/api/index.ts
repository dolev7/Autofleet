import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import {logger} from '../logger'
import vehicle from './vehicle'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json', limit: '50mb' }));
app.use(cors());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Autofleet API! 🐿️',
  });
});
app.use(['/vehicle', '/vehicles'], vehicle);

const PORT_NUMBER = 3000;
app.listen(PORT_NUMBER);
logger.info(`the server has started on port: ${PORT_NUMBER} !`);