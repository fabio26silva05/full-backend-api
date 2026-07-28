import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

router.get('/', userController.list);
router.get('/:id', userController.show);

export default router;
