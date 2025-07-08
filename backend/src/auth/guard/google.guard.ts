import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
      prompt: 'consent',
    });
  }

  handleRequest<TUser = any>(
    err: any,
    user: TUser,
    info: any,
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const googleError = req.query.error as string | undefined;

    if (res.headersSent) return null;

    if (googleError) {
      res.redirect(
        `${process.env.FRONTEND_URL}/realtime-chat/auth?provider=google&error=${googleError}`,
      );
      return null;
    }

    return user;
  }
}
