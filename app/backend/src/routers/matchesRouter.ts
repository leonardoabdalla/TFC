import { Router } from 'express';
import matchesController from '../controllers/matchesController';
import validateTokenMatches from '../midleware/validateTokenMatches';

export const router = Router();

router.get('/', matchesController.getAll);
router.post('/', validateTokenMatches, matchesController.getAdd);

export default router;
