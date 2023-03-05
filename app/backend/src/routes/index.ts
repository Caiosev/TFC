import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);

export default router;
