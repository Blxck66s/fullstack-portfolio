import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { OAuth2Client, TokenPayload, LoginTicket } from 'google-auth-library';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export class GoogleGisLoginDto {
  idToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google-gis')
  async googleGisLogin(@Body() body: GoogleGisLoginDto) {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    let ticket: LoginTicket;
    try {
      ticket = await client.verifyIdToken({
        idToken: body.idToken,
        audience: GOOGLE_CLIENT_ID,
      });
    } catch {
      throw new BadRequestException('Invalid Google ID token');
    }
    const payload: TokenPayload | undefined = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new BadRequestException('Google token missing email');
    }
    const user: Partial<User> = {
      email: payload.email,
      picture: payload.picture ?? '',
      name: payload.name ?? '',
    };
    return this.authService.validateOAuthLogin(user as User);
  }
}
