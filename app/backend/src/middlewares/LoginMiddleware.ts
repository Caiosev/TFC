import { Request, Response } from 'express';

export default function checkCredentials(req: Request, res: Response, next: () => void) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  next();
}
