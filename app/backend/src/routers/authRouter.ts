import { Router } from 'express';
import authController from '../controllers/authController';
import validateToken from '../midleware/validateToken';

export const router = Router();

router.get('/validate', validateToken, authController.validateToken);
router.post('/', authController.login);

export default router;
