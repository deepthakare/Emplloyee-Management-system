import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import employeesRouter from './routes/employees.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

app.use('/employees', employeesRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
