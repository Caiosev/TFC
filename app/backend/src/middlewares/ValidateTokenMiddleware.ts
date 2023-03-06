import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'jwt_secret';

export default async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = await jwt.verify(token, key) as jwt.JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    req.body.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
