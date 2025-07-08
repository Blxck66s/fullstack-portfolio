import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { GoogleGuard } from './guard/google.guard';
import { Public, UserWithProviders } from './auth.decorator';
import { JwtGuard } from './guard/jwt.guard';
import { Response } from 'express';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { LocalRegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('local/login')
  async login(
    @Request() req: { user: UserWithProviders },
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(req.user, response);
  }

  @Public()
  @Post('logout')
  async logout(
    @Request() req: { cookies: { refresh_token?: string } },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = req.cookies?.refresh_token || null;
    response.clearCookie('access_token');
    response.clearCookie('refresh_token', { path: '/auth' });
    if (token) {
      const validToken = await this.refreshTokenService.validate(token);
      if (validToken) await this.refreshTokenService.revoke(validToken);
    }
    response.status(200).json({ message: 'Logout successful' });
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Request()
    req: { cookies: { refresh_token?: string } },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = req.cookies?.refresh_token || null;
    if (!token) {
      response.clearCookie('refresh_token', { path: '/auth' });
      response.clearCookie('access_token');
      throw new UnauthorizedException('No refresh token provided');
    }
    try {
      const refreshToken = await this.refreshTokenService.validate(token);
      if (!refreshToken)
        throw new UnauthorizedException('Invalid refresh token');

      await this.authService.refreshToken(refreshToken, response);
      response.status(200).json({ message: 'Token refreshed successfully' });
    } catch (error) {
      console.error('Token refresh error:', error);
      response.clearCookie('access_token');
      response.clearCookie('refresh_token', { path: '/auth' });
      throw new UnauthorizedException('Failed to refresh token');
    }
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req: { user: UserWithProviders }) {
    const { id, email, name, avatarUrl, role, providers, exp } = req.user;
    return { id, email, name, avatarUrl, role, providers, exp };
  }

  @Public()
  @Post('local/register')
  async localRegister(
    @Body() user: LocalRegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const registeredUser = await this.authService.localRegister(user);
      await this.authService.login(registeredUser, response);
      response.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      throw new InternalServerErrorException(
        'Registration failed. Please try again later.',
      );
    }
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/login')
  async googleAuth() {}

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(
    @Request() req: { user: UserWithProviders },
    @Res() response: Response,
  ) {
    if (!req.user)
      throw new UnauthorizedException('Google authentication failed');

    await this.authService.login(req.user, response);
    response
      .status(200)
      .redirect(`${process.env.FRONTEND_URL}/realtime-chat/auth`);
  }
}
