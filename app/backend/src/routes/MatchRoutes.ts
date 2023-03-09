import { Router } from 'express';
import MatchController from '../controller/MatchController';

const router = Router();

const userController = new MatchController();

router.get('/', userController.getAllMatches);

export default router;
