import { Body, Controller, Param, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prismaService: PrismaService) {}

  @Patch(':userId/online-status')
  updateUserOnlineStatus(
    @Param('userId') userId: string,
    @Body('isOnline') isOnline: boolean,
  ) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { isOnline },
    });
  }
}
