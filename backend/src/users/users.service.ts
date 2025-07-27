import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneWithOAuth({ email, id }: { email?: string; id?: string }) {
    if (id) {
      return await this.prisma.user.findUnique({
        where: { id },
        include: {
          providers: {
            select: { provider: true, providerId: true },
          },
        },
      });
    } else if (email) {
      return await this.prisma.user
        .findUnique({
          where: { email },
          include: {
            providers: {
              select: { provider: true, providerId: true },
            },
          },
        })
        .catch((e) => {
          console.log(e);
          return null;
        });
    } else return null;
  }

  async createOAuthUser(user: {
    id?: string | null;
    email: string;
    name: string;
    password?: string | null;
    avatarUrl: string | null;
    provider: string;
    providerId: string;
  }) {
    return this.prisma.user.create({
      data: {
        id: user.id ?? undefined,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        password: user.password ?? null,
        providers: {
          create: {
            provider: user.provider,
            providerId: user.providerId,
          },
        },
      },
      include: {
        providers: {
          select: { provider: true, providerId: true },
        },
      },
    });
  }

  async updateUserOnlineStatus(userId: string, isOnline: boolean) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline },
    });
  }
}
