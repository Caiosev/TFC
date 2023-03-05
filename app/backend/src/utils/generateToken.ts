import jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET || 'segredo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function generateToken(user: any) {
  const token = jwt.sign(user, key, {
    expiresIn: 86400,
  });
  return token;
}
