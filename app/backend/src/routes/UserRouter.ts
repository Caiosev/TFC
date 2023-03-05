import { Router } from 'express';
import checkCredentials from '../middlewares/LoginMiddleware';
import UserController from '../controller/UserController';

const router = Router();

const userController = new UserController();

router.post('/', checkCredentials, userController.login);

export default router;
