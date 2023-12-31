import jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'jwt_secret';

export default function generateToken(email: string) {
  const token = jwt.sign({ data: { email } }, key, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
}
