import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.json([
    {
      id: 1,
      title: 'Primeiro post',
      content: 'Exemplo de publicação para demonstrar a API.',
      author: 'Fábio'
    }
  ]);
});

export default router;
