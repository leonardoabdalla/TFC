import { Router } from 'express';
import teamsController from '../controllers/teamsController';

export const router = Router();

router.get('/:id', teamsController.getById);
router.get('/', teamsController.getAll);

export default router;
