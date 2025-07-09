import { CookieOptions } from 'express';

export const cookieRefreshTokenOptionsDelete: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/auth',
};

export const cookieRefreshTokenOptionsCreate: CookieOptions = {
  ...cookieRefreshTokenOptionsDelete,
  maxAge: +(process.env.REFRESH_TOKEN_AGE || 7 * 24 * 60 * 60 * 1000), // 7 days
};

export const cookieAccessTokenOptionsDelete: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
};

export const cookieAccessTokenOptionsCreate: CookieOptions = {
  ...cookieAccessTokenOptionsDelete,
  maxAge: +(process.env.ACCESS_TOKEN_AGE || 15 * 60 * 1000), // 15 minutes
};
