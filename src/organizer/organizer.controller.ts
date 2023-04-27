import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Organizer } from 'src/organizer/entities/organizer.entity';
import { OrganizerService } from './organizer.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
@ApiBearerAuth()
@ApiTags('organizer')
@Controller('organizer')
export class OrganizerController {
    constructor(private readonly organizerService: OrganizerService) { }

    @Get(':userId')
    @ApiOperation({ summary: 'Listar todas os organizadores.' })
    @ApiOkResponse({ description: 'organizadores listadas com sucesso.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'ID do usuario admin',
    })
    findAll(@Param('userId') userId: number): Promise<Organizer[]> {
        return this.organizerService.findAll(userId);
    }

    @Get(':id/:userId')
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do organizador a ser buscado',
    })
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'ID do usuario admin',
    })
    @ApiOperation({ summary: 'Buscar uma categoria de organizador pelo ID.' })
    @ApiOkResponse({ description: 'Categoria de organizador encontrado com sucesso.'})
    @ApiNotFoundResponse({ description: 'Categoria de organizador não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findById(@Param('id') id: number, @Param('userId') userId: number): Promise<Organizer> {
        return this.organizerService.findById(id, userId);
    }

    @Post(':userId')
    @ApiOperation({ summary: 'Criar um novo organizador.' })
    @ApiCreatedResponse({ description: 'organizador criado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar um organizador.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'ID do usuario admin',
    })
    create(@Body() organizer: CreateOrganizerDto,  @Param('userId') userId: number): Promise<Organizer> {
        return this.organizerService.create(organizer, userId);
    }

    @Put(':id/:userId')
    @ApiOperation({ summary: 'Atualizar organizador pelo ID.' })
    @ApiOkResponse({ description: 'organizador atualizado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar um organizador.'})
    @ApiNotFoundResponse({ description: 'organizador não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do organizador a ser atualizado',
    })
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'ID do usuario admin',
    })
    update(@Param('id') id: number, @Body() organizer: CreateOrganizerDto, @Param('userId') userId: number): Promise<Organizer> {
        return this.organizerService.update(id, organizer, userId);
    }

    @Delete(':id/:userId')
    @ApiOperation({ summary: 'Deletar um organizador pelo ID.' })
    @ApiOkResponse({ description: 'organizador deletado com sucesso.'})
    @ApiNotFoundResponse({ description: 'organizador não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do organizador a ser deletado',
    })
    @ApiParam({
        name: 'userId',
        type: 'integer',
        description: 'ID do usuario admin',
    })
    delete(@Param('id') id: number, @Param('userId') userId: number): Promise<Organizer> {
        return this.organizerService.delete(id, userId);
    }
}
