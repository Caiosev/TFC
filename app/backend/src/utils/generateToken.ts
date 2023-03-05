import jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'segredo';

export default function generateToken(email: string) {
  const token = jwt.sign({ data: { email } }, key, {
    expiresIn: 86400,
  });
  return token;
}
