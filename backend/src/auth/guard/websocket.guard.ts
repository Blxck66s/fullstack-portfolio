import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

interface WebSocketClient {
  handshake: Record<string, any>;
}

export class WebSocketGuard extends AuthGuard('wsjwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient<WebSocketClient>();
  }
}
