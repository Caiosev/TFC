import { Router } from 'express';
import TeamController from '../controller/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.get);

export default router;
