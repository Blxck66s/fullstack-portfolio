import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { WsException } from '@nestjs/websockets';
import { JwtPayload } from './jwt.strategy';
import { AuthService } from '../auth.service';
import type { Algorithm } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(private readonly authService: AuthService) {
    if (!process.env.JWT_SECRET) throw new Error('jwt secret is not defined');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Socket) => {
          // Extract token from cookies
          if (
            request &&
            request.handshake &&
            request.handshake.headers.cookie
          ) {
            const cookies = this.parseCookies(request.handshake.headers.cookie);
            return cookies['access_token'] || null; // Replace 'access_token' with your cookie name
          }
          return null;
        },
      ]),
      algorithms: [(process.env.JWT_ALGORITHM as Algorithm) || 'HS256'],
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) throw new WsException('Unauthorized access');
    const user = await this.authService.validateJwtUser(payload);
    if (!user) throw new WsException('Unauthorized access');
    return user;
  }

  private parseCookies(cookieHeader: string): Record<string, string> {
    return cookieHeader.split(';').reduce(
      (cookies, cookie) => {
        const [key, value] = cookie.split('=').map((part) => part.trim());
        cookies[key] = value;
        return cookies;
      },
      {} as Record<string, string>,
    );
  }
}
