import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategy/jwt.strategy';
import type { Algorithm } from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { Response } from 'express';
import { Prisma, RefreshToken } from '@prisma/client';
import { UserWithProviders } from './auth.decorator';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser(email: string, pass: string) {
    const user = await this.usersService.findOneWithOAuth({ email });
    if (
      user &&
      user.providers.some(
        (provider) =>
          provider.provider === 'local' && provider.providerId === user.id,
      ) &&
      bcrypt.compareSync(pass, user.password || '')
    )
      return user;
    else if (!user) throw new UnauthorizedException('user_not_found');
    else return null;
  }

  async validateJwtUser(payload: JwtPayload) {
    const { exp, sub, email } = payload;
    const user = await this.usersService.findOneWithOAuth({
      id: sub,
      email,
    });

    if (user && user.id === sub) return { ...user, password: null, exp };
    else return null;
  }

  async validateGoogleUser(profile: Profile) {
    const email = profile?.emails?.[0]?.value || null;
    const isEmailVerified = profile?.emails?.[0]?.verified || false;
    if (!email || !isEmailVerified) return null;
    const user = await this.usersService.findOneWithOAuth({ email });
    if (user) return user;
    else return await this.googleRegister(profile);
  }

  async login(user: UserWithProviders, response: Response) {
    await this.refreshTokenService.revokeAllUserTokens({ userId: user.id });
    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXP || '15m',
        algorithm: (process.env.JWT_ALGORITHM as Algorithm) || 'HS256',
        secret: process.env.JWT_SECRET,
      },
    );

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: +(process.env.ACCESS_TOKEN_AGE || 15 * 60 * 1000), // 15 minutes
    });
    await this.refreshTokenService.create(user.id, response);
  }

  async localRegister(user: {
    name?: string | null;
    email: string;
    password: string;
  }) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const id = uuidv4();

      return await this.usersService.createOAuthUser({
        id,
        email: user.email,
        name:
          user.name ||
          uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
          }),
        avatarUrl: null,
        provider: 'local',
        providerId: id,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new UnauthorizedException('user_already_exists');
          case 'P2003':
            throw new UnauthorizedException('invalid_credentials');
        }
      }

      console.error('Error during local registration:', error);
      throw new UnauthorizedException('registration_failed');
    }
  }

  async googleRegister(profile: Profile) {
    const email = profile?.emails?.[0]?.value || null;
    const isEmailVerified = profile?.emails?.[0]?.verified || false;
    if (!email || !isEmailVerified)
      throw new UnauthorizedException('Email not verified');
    const name = profile?.displayName || null;
    const avatarUrl = profile?.photos?.[0]?.value || null;

    return await this.usersService.createOAuthUser({
      email,
      name:
        name ||
        uniqueNamesGenerator({
          dictionaries: [adjectives, colors, animals],
        }),
      avatarUrl,
      provider: 'google',
      providerId: profile.id,
    });
  }

  async refreshToken(token: RefreshToken, response: Response) {
    const user = await this.usersService.findOneWithOAuth({
      id: token.userId,
    });
    if (!user) {
      response.status(401).json({ message: 'Invalid or expired token' });
      response.clearCookie('refresh_token', { path: '/auth' });
      response.clearCookie('access_token');
      return;
    }
    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_ACCESS_EXP || '15m',
        algorithm: (process.env.JWT_ALGORITHM as Algorithm) || 'HS256',
        secret: process.env.JWT_SECRET,
      },
    );

    response.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: +(process.env.ACCESS_TOKEN_AGE || 15 * 60 * 1000), // 15 minutes
    });
    await this.refreshTokenService.rotate(token, response);
  }
}
