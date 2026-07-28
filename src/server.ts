import express, { Request, Response } from 'express';
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
  return res.json({
    name: 'Portfolio Backend API',
    status: 'online',
    message: 'API pronta para demonstrar autenticação, usuários e posts.'
  });
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});