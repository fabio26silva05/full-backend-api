import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (_req: Request, res: Response) => {
  const token = jwt.sign({ id: 'demo-user', email: 'demo@portfolio.com' }, process.env.JWT_SECRET || 'portfolio-dev-secret', {
    expiresIn: '1h'
  });

  return res.json({ token });
});

export default router;
