import { Router } from 'express';
import TeamController from '../controller/TeamController';

const router = Router();

const teamController = new TeamController();

router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.get);
