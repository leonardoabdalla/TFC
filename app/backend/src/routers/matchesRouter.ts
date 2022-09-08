import { Router } from 'express';
import matchesController from '../controllers/matchesController';

export const router = Router();

router.get('/', matchesController.getAll);

export default router;
