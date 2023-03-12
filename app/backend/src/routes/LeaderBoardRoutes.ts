import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.home);
export default router;
