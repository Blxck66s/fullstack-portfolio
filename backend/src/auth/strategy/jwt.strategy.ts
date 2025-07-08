import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import type { Algorithm } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    if (!process.env.JWT_SECRET) throw new Error('jwt secret is not defined');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request & { cookies: { access_token: string | null } }) => {
          return request?.cookies?.access_token || null;
        },
      ]),
      algorithms: [(process.env.JWT_ALGORITHM as Algorithm) || 'HS256'],
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    if (!payload) return done(new UnauthorizedException(), false);
    const user = await this.authService.validateJwtUser(payload);
    if (!user) return done(new UnauthorizedException(), false);
    return done(null, user);
  }
}

export interface JwtPayload {
  iat: number;
  exp: number;
  sub: string;
  email: string;
  name: string;
  role: string;
}
