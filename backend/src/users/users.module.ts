import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserGateway } from './users.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService, UserGateway],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
