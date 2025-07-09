import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import type { Algorithm } from 'jsonwebtoken';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(userId: string, response: Response): Promise<string> {
    const tokenId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
        jti: tokenId,
        typ: 'refresh',
      },
      {
        expiresIn: process.env.JWT_REFRESH_EXP || '7d',
        algorithm: (process.env.JWT_ALGORITHM as Algorithm) || 'HS256',
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );
    const hashedToken = await bcrypt.hash(token, 10);

    await this.prisma.refreshToken.create({
      data: {
        id: tokenId,
        token: hashedToken,
        userId,
        expiresAt,
      },
    });

    response.cookie('refresh_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/auth',
      maxAge: +(process.env.REFRESH_TOKEN_AGE || 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return token;
  }

  async validate(token: string) {
    const payload = await this.jwtService.verifyAsync<{
      jti: string;
    }>(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { id: payload.jti },
    });
    if (!refreshToken) return null;
    if (refreshToken.expiresAt < new Date()) await this.revoke(refreshToken);

    const isValid = await bcrypt.compare(token, refreshToken.token);
    if (!isValid) {
      console.warn('Refresh token reuse detected:', token);
      await this.revokeAllUserTokens({ userId: refreshToken.userId });
      return null;
    } else return refreshToken;
  }

  async rotate(token: RefreshToken, response: Response): Promise<string> {
    await this.revoke(token);
    return await this.create(token.userId, response);
  }

  async revoke(token: RefreshToken): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: { id: token.id },
    });
  }

  async revokeAllUserTokens({
    userId,
    token,
  }:
    | { userId: string; token?: undefined }
    | { userId?: undefined; token: string }) {
    if (userId) {
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    } else if (token) {
      const existingToken = await this.prisma.refreshToken.findUnique({
        where: { token },
      });
      if (!existingToken) return;
      await this.prisma.refreshToken.deleteMany({
        where: { userId: existingToken.userId },
      });
    }
  }

  async cleanupExpired(): Promise<void> {
    await this.prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    console.log('Running cleanup of expired refresh tokens');
    await this.cleanupExpired();
  }
}
