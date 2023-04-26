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

    @Get()
    @ApiOperation({ summary: 'Listar todas os organizadores.' })
    @ApiOkResponse({ description: 'organizadores listadas com sucesso.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findAll(): Promise<Organizer[]> {
        return this.organizerService.findAll();
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do organizador a ser buscado',
    })
    @ApiOperation({ summary: 'Buscar uma categoria de organizador pelo ID.' })
    @ApiOkResponse({ description: 'Categoria de organizador encontrado com sucesso.'})
    @ApiNotFoundResponse({ description: 'Categoria de organizador não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findById(@Param('id') id: number): Promise<Organizer> {
        return this.organizerService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo organizador.' })
    @ApiCreatedResponse({ description: 'organizador criado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar um organizador.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    create(@Body() organizer: CreateOrganizerDto): Promise<Organizer> {
        return this.organizerService.create(organizer);
    }

    @Put(':id')
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
    update(@Param('id') id: number, @Body() organizer: CreateOrganizerDto): Promise<Organizer> {
        return this.organizerService.update(id, organizer);
    }

    @Delete(':id')
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
    delete(@Param('id') id: number): Promise<Organizer> {
        return this.organizerService.delete(id);
    }
}
