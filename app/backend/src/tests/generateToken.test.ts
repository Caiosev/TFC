import jwt from 'jsonwebtoken';
import generateToken from './../utils/generateToken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked-token'),
}));

describe('generateToken', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error if email is not provided', () => {
    expect(() => generateToken('')).toThrow('Email must be provided');
  });

  test('should generate a valid token', () => {
    const email = 'user@example.com';
    const expectedPayload = { data: { email } };
    const expectedOptions = { expiresIn: '7d', algorithm: 'HS256' };
    const token = generateToken(email);
    expect(jwt.sign).toHaveBeenCalledWith(expectedPayload, 'key', expectedOptions);
    expect(token).toBe('mocked-token');
  });
});
