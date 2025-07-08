import { SetMetadata } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export type UserWithProviders = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    avatarUrl: true;
    providers: {
      select: {
        provider: true;
        providerId: true;
      };
    };
    role: true;
  };
}> & {
  exp?: number;
};
