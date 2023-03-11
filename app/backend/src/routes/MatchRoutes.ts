import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/ValidateTokenMiddleware';
import MatchController from '../controller/MatchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.getAllMatches);
router.patch('/:id/finish', validateTokenMiddleware, matchController.update);

export default router;
