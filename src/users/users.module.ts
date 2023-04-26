import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service'
import { UsersController } from './users.controller';
import { AuthController } from './auth/auth.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController, AuthController]
})
export class UsersModule {}
