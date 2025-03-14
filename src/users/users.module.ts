import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
