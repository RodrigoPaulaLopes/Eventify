import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dto/create-user.dto';
import { CreateLoginDto } from './dto/create-login.dto';

@ApiTags("Authenticate")
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService) { }

    @Post('login')
    login(@Body() user: CreateLoginDto): Promise<String> {
        return this.userService.login(user.email, user.password);
    }

    @Post('register')
    create(@Body() user: CreateUserDto): Promise<User> {
      return this.userService.create(user);
    }
}
