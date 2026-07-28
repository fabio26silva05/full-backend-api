import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  return res.json([
    { id: 1, name: 'Fábio', email: 'fabio@portfolio.com' }
  ]);
});

export default router;
