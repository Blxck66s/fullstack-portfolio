import { CookieOptions } from 'express';

export const myCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
};

export const cookieRefreshTokenOptionsDelete: CookieOptions = {
  ...myCookieOptions,
  path: '/auth',
};

export const cookieRefreshTokenOptionsCreate: CookieOptions = {
  ...cookieRefreshTokenOptionsDelete,
  maxAge: +(process.env.REFRESH_TOKEN_AGE || 7 * 24 * 60 * 60 * 1000), // 7 days
};

export const cookieAccessTokenOptionsDelete: CookieOptions = {
  ...myCookieOptions,
  path: '/',
};

export const cookieAccessTokenOptionsCreate: CookieOptions = {
  ...cookieAccessTokenOptionsDelete,
  maxAge: +(process.env.ACCESS_TOKEN_AGE || 15 * 60 * 1000), // 15 minutes
};
