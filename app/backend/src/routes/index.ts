import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRoute from './MatchRoutes';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRoute);

export default router;
