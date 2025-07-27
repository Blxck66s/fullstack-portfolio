import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserWithProviders } from 'src/auth/auth.decorator';
import { User } from 'src/users/users.decorator';
import { CreateRoomDto, RoomPaginationDto } from './dto';
import { MessagePaginationDto } from './dto/message-pagination.dto';
import { UsersService } from 'src/users/users.service';

@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService,
    private usersService: UsersService,
  ) {}

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

  @Post('room/:roomId/member/:userId')
  async inviteMemberToRoom(
    @Param('roomId') roomId: string,
    @Param('email') email: string,
    @User() user: UserWithProviders,
  ) {
    try {
      const isOwner = await this.chatService.isRoomOwner(roomId, user.id);
      if (!isOwner)
        throw new BadRequestException('Permission denied: Not the room owner');
      const userToAdd = await this.usersService.findOneWithOAuth({ email });
      if (!userToAdd)
        throw new BadRequestException('User not found with the provided email');
      return await this.chatService.inviteMemberToRoom(roomId, userToAdd.id);
    } catch (error) {
      console.error(`Error inviting member to room ${roomId}:`, error);
      throw new BadRequestException('Failed to invite member to room');
    }
  }
}
