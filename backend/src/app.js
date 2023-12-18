const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const itemRouter = require('./api/items'); 

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api); // it uses the 'api' module(directory) for routing under the '/api/v1' path
app.use('/api/items',itemRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
