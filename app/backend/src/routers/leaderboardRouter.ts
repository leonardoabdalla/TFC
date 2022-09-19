import { Router } from 'express';
import leaderHomeController from '../controllers/leaderHomeController';

export const router = Router();

router.get('/home', leaderHomeController.homeTeam);
router.get('/away', leaderHomeController.awayTeam);
export default router;
