import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/ValidateTokenMiddleware';
import checkCredentials from '../middlewares/LoginMiddleware';
import UserController from '../controller/UserController';

const router = Router();

const userController = new UserController();

router.post('/', checkCredentials, userController.login);
router.get('/role', validateTokenMiddleware, userController.getRole);
export default router;
