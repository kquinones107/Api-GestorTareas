const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', require('./routes/auth.routes'));
app.use('/tasks', require('./routes/tasks.routes'));

app.use(errorHandler);

module.exports = app;
