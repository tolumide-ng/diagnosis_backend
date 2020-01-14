import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Routes from './routes/v1/index';


const app = express();

app.use(cors());
app.use(require('morgan')('dev'));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

Routes(app);

app.use('/', (req, res) => {
  res.status(200).json({
    data: 'Welcome to diagnosis App',
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    data: 'Page Not Found on diagnosis API',
  });
});

export default app;
