const express = require('express');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Token CSRF inválido' });
  }
  next(err);
});

module.exports = app;
