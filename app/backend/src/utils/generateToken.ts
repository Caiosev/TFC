import jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'segredo';

export default function generateToken(user: any) {
  const token = jwt.sign(user, key, {
    expiresIn: 86400,
  });
  return token;
}
