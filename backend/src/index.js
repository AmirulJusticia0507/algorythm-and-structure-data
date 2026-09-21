import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import linkedListRoutes from './routes/linkedListRoutes.js';
import queueRoutes from './routes/queueRoutes.js';
import stackRoutes from './routes/stackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'Data Structures API',
    version: '1.0.0',
    endpoints: {
      linkedList: '/api/linked-list',
      queue: '/api/queue',
      stack: '/api/stack'
    }
  });
});

app.use('/api/linked-list', linkedListRoutes);
app.use('/api/queue', queueRoutes);
app.use('/api/stack', stackRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;