import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const userController = {
  list: async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return res.json(users);
  },

  show: async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    return res.json(user);
  }
};
