import { Injectable } from '@nestjs/common';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoomPaginationDto } from './dto';
import { MessagePaginationDto } from './dto/message-pagination.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createRoom(userId: string, roomName: string) {
    return await this.prisma.chatRoom.create({
      data: {
        name: roomName,
        members: {
          create: {
            user: { connect: { id: userId } },
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        members: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                isOnline: true,
              },
            },
          },
        },
        messages: true,
      },
    });
  }

  async getRooms(userId: string, pagination: RoomPaginationDto) {
    const rooms = this.prisma.$extends(withAccelerate()).chatRoom.findMany({
      where: {
        members: { some: { userId } },
      },
      include: {
        members: {
          select: {
            id: true,
            userId: true,
            chatRoomId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                isOnline: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip: (pagination.page - 1) * pagination.take,
      take: pagination.take,
      cacheStrategy: {
        swr: 60,
        ttl: 60,
      },
    });
    const totalCount = this.prisma.$extends(withAccelerate()).chatRoom.count({
      where: {
        members: { some: { userId } },
      },
      cacheStrategy: {
        swr: 60,
        ttl: 60,
      },
    });

    return await this.prisma
      .$transaction([rooms, totalCount])
      .then(([roomsData, totalCountData]) => ({
        rooms: roomsData,
        totalCount: totalCountData,
      }));
  }

  async getMessages(roomId: string, pagination: MessagePaginationDto) {
    const messages = this.prisma
      .$extends(withAccelerate())
      .chatMessage.findMany({
        where: { chatRoomId: roomId },
        skip: (pagination.page - 1) * pagination.take,
        take: pagination.take,
        orderBy: { createdAt: 'desc' },
        cacheStrategy: {
          swr: 60,
          ttl: 60,
        },
      });

    const totalCount = this.prisma
      .$extends(withAccelerate())
      .chatMessage.count({
        where: { chatRoomId: roomId },
        cacheStrategy: {
          swr: 60,
          ttl: 60,
        },
      });

    return await this.prisma
      .$transaction([messages, totalCount])
      .then(([messagesData, totalCountData]) => ({
        messages: messagesData,
        totalCount: totalCountData,
      }));
  }

  async inviteMemberToRoom(roomId: string, userId: string) {
    return await this.prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        members: {
          create: { user: { connect: { id: userId } }, status: 'PENDING' },
        },
      },
    });
  }

  removeMemberFromRoom(roomId: string, userId: string) {
    return this.prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        members: { disconnect: { id: userId } },
        messages: {
          updateMany: {
            where: { chatMemberId: userId },
            data: { deletedAt: new Date() },
          },
        },
      },
    });
  }

  async createMessage(roomId: string, memberId: string, message: string) {
    return await this.prisma.chatMessage.create({
      data: {
        chatRoomId: roomId,
        message,
        chatMemberId: memberId,
      },
    });
  }

  async getMemberInfo(roomId: string, userId: string) {
    return await this.prisma.chatMember.findFirst({
      where: {
        chatRoomId: roomId,
        userId,
      },
      select: {
        id: true,
        userId: true,
        createdAt: true,
      },
    });
  }

  async isRoomOwner(roomId: string, userId: string) {
    const member = await this.prisma.chatMember.findFirst({
      where: { chatRoomId: roomId, userId },
      orderBy: { createdAt: 'asc' },
    });
    return member?.userId === userId;
  }
}
