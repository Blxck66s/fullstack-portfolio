import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserWithProviders } from 'src/auth/auth.decorator';
import { User } from 'src/users/users.decorator';
import { CreateRoomDto, RoomPaginationDto } from './dto';
import { MessagePaginationDto } from './dto/message-pagination.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('room')
  async createRoom(
    @Body() { name }: CreateRoomDto,
    @User() user: UserWithProviders,
  ) {
    return await this.chatService.createRoom(user.id, name);
  }

  @Get('rooms')
  async getRooms(
    @User() user: UserWithProviders,
    @Query() pagination: RoomPaginationDto,
  ) {
    return await this.chatService.getRooms(user.id, pagination);
  }

  @Get('room/:roomId/messages')
  async getMessages(
    @Param('roomId') roomId: string,
    @Query() pagination: MessagePaginationDto,
  ) {
    return await this.chatService.getMessages(roomId, pagination);
  }
}
