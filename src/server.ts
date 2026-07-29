import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({
    name: 'Portfolio Backend API',
    status: 'online',
    message: 'API REST desenvolvida com TypeScript, Express e Prisma para demonstrar uma arquitetura backend organizada.'
  });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : 'Erro interno do servidor.';
  const status = typeof err === 'object' && err !== null && 'status' in err && typeof (err as { status?: number }).status === 'number'
    ? (err as { status: number }).status
    : 500;

  console.error(message);
  return res.status(status).json({ error: message });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`[server] API listening on port ${PORT}`);
});