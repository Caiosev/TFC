import bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import generateToken from '../utils/generateToken';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.service.find(email);
      if (user) {
        const passwordIsValid = bcrypt.compareSync(password, user?.password || '');
        if (passwordIsValid) {
          const token = generateToken(email);
          return res.status(200).json({ token });
        }
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };

  public getRole = async (req: Request, res: Response) => {
    try {
      const user = await this.service.find(req.body.user.data.email);
      if (user) {
        return res.status(200).json({ role: user.role });
      }
      return res.status(401).json({ message: 'Token must be valid token' });
    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  };
}
