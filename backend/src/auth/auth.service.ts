import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(user: User): Promise<{
    access_token: string;
    user: Pick<User, 'email' | 'picture'>;
  }> {
    const existingUser = await this.prisma.user.upsert({
      where: { email: user.email },
      update: { picture: user.picture, name: user.name },
      create: {
        email: user.email,
        picture: user.picture,
        name: user.name,
      },
    });

    const payload = { sub: existingUser.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        email: existingUser.email,
        picture: existingUser.picture,
      },
    };
  }
}
