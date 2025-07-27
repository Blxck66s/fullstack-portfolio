import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebSocketGuard } from 'src/auth/guard/websocket.guard';
import { UsersService } from './users.service';
import { UserWithProviders } from 'src/auth/auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/strategy/jwt.strategy';

@UseGuards(WebSocketGuard)
@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL },
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket & { user?: UserWithProviders }) {
    try {
      const cookieHeader = client.handshake.headers.cookie;
      if (!cookieHeader) throw new WsException('No cookies found');

      const cookies = this.parseCookies(cookieHeader);
      const payload = this.jwtService.verify<JwtPayload>(
        cookies['access_token'],
        { secret: process.env.JWT_SECRET },
      );

      const user = await this.authService.validateJwtUser(payload);
      if (!user) throw new WsException('Unauthorized user');

      client.user = user;
      // await this.usersService.updateUserOnlineStatus(client.user.id, true);

      client.broadcast.emit('userConnected', { userId: client.user.id });
      console.log(`User ${client.user.id} connected`);
    } catch (error) {
      console.error(`Error during connection for client ${client.id}:`, error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  private parseCookies(cookieHeader: string): Record<string, string> {
    return cookieHeader.split(';').reduce(
      (cookies, cookie) => {
        const [key, value] = cookie.split('=').map((part) => part.trim());
        cookies[key] = value;
        return cookies;
      },
      {} as Record<string, string>,
    );
  }
}
