import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const postController = {
  list: async (_req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } } }
    });

    return res.json(posts);
  },

  show: async (req: Request, res: Response) => {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { author: { select: { id: true, name: true, email: true } } }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado.' });
    }

    return res.json(post);
  },

  create: async (req: Request, res: Response) => {
    const { title, content } = req.body as { title?: string; content?: string };

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
    }

    const userId = (req as Request & { user?: { id: number } }).user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId
      },
      include: { author: { select: { id: true, name: true, email: true } } }
    });

    return res.status(201).json(post);
  }
};
