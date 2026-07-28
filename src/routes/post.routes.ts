import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', postController.list);
router.get('/:id', postController.show);
router.post('/', authMiddleware, postController.create);

export default router;
