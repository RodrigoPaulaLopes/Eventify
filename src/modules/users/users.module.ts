import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users/users.entity';
import { UsersService } from '../../services/users/users.service'
import { UsersController } from '../../controllers/users/users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
