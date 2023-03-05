import bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import generateToken from '../utils/generateToken';

const emailRegex = /\S+@\S+\.\S+/;

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    const user = await this.service.find(email);
    if (user || password.length > 6 || emailRegex.test(email)) {
      const passwordIsValid = bcrypt.compareSync(password, user?.password || '');
      if (passwordIsValid) {
        const token = generateToken(email);
        return res.status(200).json({ token });
      }
    }
    return res.status(400).json({ message: 'Invalid email or password' });
  };
}
