import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email?: string, password?: string) {
    if (!email || !password) throw new UnauthorizedException('field_required');
    const user = await this.authService.validateLocalUser(email, password);
    if (!user) throw new UnauthorizedException('invalid_credentials');
    else return user;
  }
}
