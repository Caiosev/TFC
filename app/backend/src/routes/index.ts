import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRoute from './MatchRoutes';
import LeaderboardRouter from './LeaderBoardRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRoute);
router.use('/leaderboard', LeaderboardRouter);

export default router;
