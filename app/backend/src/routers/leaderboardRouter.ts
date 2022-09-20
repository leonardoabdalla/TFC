import { Router } from 'express';
import leaderHomeController from '../controllers/leaderHomeController';

export const router = Router();

router.get('/home', leaderHomeController.homeTeam);
router.get('/away', leaderHomeController.awayTeam);
router.get('/', leaderHomeController.getAll);
export default router;
