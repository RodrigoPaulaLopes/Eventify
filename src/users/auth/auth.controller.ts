import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../entities/users.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '../dto/create-user.dto';
import { CreateLoginDto } from './dto/create-login.dto';

@ApiTags("Authenticate")
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) { }

  @Post('login')
  @ApiOperation({ summary: 'Efetuar login do usuario' })
  @ApiNotFoundResponse({ description: 'Usuario não encontrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  login(@Body() user: CreateLoginDto): Promise<String> {
    return this.userService.login(user.email, user.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Criar um novo usuario.' })
  @ApiCreatedResponse({ description: 'Usuario criado com sucesso.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos para criar um usuario.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }
}
