import { Request, Response } from 'express';
import checkCredentials from '../middlewares/LoginMiddleware';

describe('checkCredentials', () => {
  const req: Request = {
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

  test('should return a 400 status if email or password is not provided', () => {
    checkCredentials(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields must be filled' });
  });

  test('should return a 401 status if email is not valid or password is less than 6 characters', () => {
    req.body.email = 'invalid-email';
    req.body.password = '12345';
    checkCredentials(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  test('should call the next function if credentials are valid', () => {
    req.body.email = 'valid-email@test.com';
    req.body.password = 'password123';
    checkCredentials(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
