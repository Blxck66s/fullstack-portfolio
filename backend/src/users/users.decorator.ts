import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithProviders } from 'src/auth/auth.decorator';

interface RequestWithUser {
  user: UserWithProviders;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserWithProviders => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
