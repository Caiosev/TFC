import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import validateTokenMiddleware from '../middlewares/ValidateTokenMiddleware';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('validateTokenMiddleware', () => {
  const req: Request = {
    headers: {},
    body: {},
  } as Request;

  const res: Response = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a 401 status if token is not provided', async () => {
    await validateTokenMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not found' });
  });

  test('should return a 401 status if token is invalid', async () => {
    const token = 'invalid-token';
    req.headers.authorization = token;
    (jwt.verify as jest.Mock).mockRejectedValueOnce(new Error('Invalid token'));
    await validateTokenMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token must be a valid token' });
  });

  test('should call the next function if token is valid', async () => {
    const token = 'valid-token';
    const decoded: JwtPayload = {
      sub: 'user-id',
    };
    req.headers.authorization = token;
    (jwt.verify as jest.Mock).mockResolvedValueOnce(decoded);
    await validateTokenMiddleware(req, res, next);
    expect(req.body.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });
});
