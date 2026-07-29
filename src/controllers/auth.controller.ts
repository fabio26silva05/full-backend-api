import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { signToken } from '../lib/auth';

interface AuthBody {
  name?: string;
  email?: string;
  password?: string;
}

function normalizeAuthBody(body: AuthBody) {
  return {
    name: body.name?.trim(),
    email: body.email?.trim().toLowerCase(),
    password: body.password
  };
}

export const authController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password } = normalizeAuthBody(req.body as AuthBody);

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    const token = signToken({ id: user.id, email: user.email });

    return res.status(201).json({ user, token });
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = normalizeAuthBody(req.body as AuthBody);

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = signToken({ id: user.id, email: user.email });

    return res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
  },

  me: async (req: Request & { user?: { id: number; email: string } }, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);
  }
};
