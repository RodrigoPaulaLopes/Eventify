import { Controller, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity'
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuarios.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
  @ApiBearerAuth()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuario pelo ID.' })
  @ApiOkResponse({ description: 'usuario encontrad com sucesso.'})
  @ApiNotFoundResponse({ description: 'usuario não encontrada.'})
  @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID do usuário a ser recuperado',
  })
  @ApiBearerAuth()
  findById(@Param('id') id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuario pelo ID.' })
  @ApiOkResponse({ description: 'usuario atualizado com sucesso.'})
  @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar um usuario.'})
  @ApiNotFoundResponse({ description: 'usuario não encontrado.'})
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
  @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID do usuário a ser atualizado',
  })
  update(@Param('id') id: number, @Body() user: CreateUserDto): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um usuario pelo ID.' })
  @ApiOkResponse({ description: 'usuario deletado com sucesso.'})
  @ApiNotFoundResponse({ description: 'usuario não encontrado.'})
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
  @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID do usuário a ser removido',
  })
  delete(@Param('id') id: number): Promise<User> {
    return this.userService.delete(id);
  }


}


