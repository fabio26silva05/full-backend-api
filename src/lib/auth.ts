import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: number;
  email: string;
}

function getJwtSecret(): string {
  return process.env.JWT_SECRET || 'development-secret';
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '1h' });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, getJwtSecret()) as AuthPayload;
}
