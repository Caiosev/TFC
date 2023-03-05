import { Request, Response } from 'express';

const emailRegex = /\S+@\S+\.\S+/;

export default function checkCredentials(req: Request, res: Response, next: () => void) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (password.length < 6 || !emailRegex.test(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
}
