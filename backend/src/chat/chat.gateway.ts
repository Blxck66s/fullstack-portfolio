import {
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { UserWithProviders } from 'src/auth/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { WebSocketGuard } from 'src/auth/guard/websocket.guard';

@UseGuards(WebSocketGuard)
@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    payload: {
      roomId: string;
      message: string;
    },
    @ConnectedSocket() client: Socket & { user: UserWithProviders },
  ) {
    const member = await this.chatService.getMemberInfo(
      payload.roomId,
      client.user.id,
    );
    if (!member) {
      console.error(
        `User ${client.user.id} is not a member of room ${payload.roomId}`,
      );
      return;
    }
    const message = await this.chatService.createMessage(
      payload.roomId,
      member.id,
      payload.message,
    );
    client.to(payload.roomId).emit('message', {
      memberId: member.id,
      message: payload.message,
      createdAt: message.createdAt,
    });
    return { success: true, message };
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(roomId);
    console.log(`Client ${client.id} left room ${roomId}`);
  }
}
