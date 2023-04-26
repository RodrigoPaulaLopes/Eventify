import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from 'src/event/entities/event.entity';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
@ApiBearerAuth()
@ApiTags('event')
@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todos os eventos.' })
    @ApiOkResponse({ description: 'eventos listadas com sucesso.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um evento pelo ID.' })
    @ApiOkResponse({ description: 'evento encontrado com sucesso.'})
    @ApiNotFoundResponse({ description: 'evento não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do evento a ser buscado',
    })
    findById(@Param('id') id: number): Promise<Event> {
        return this.eventService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo evento.' })
    @ApiCreatedResponse({ description: 'evento criado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar um evento.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    create(@Body() event: CreateEventDto): Promise<Event> {
        return this.eventService.create(event);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar evento pelo ID.' })
    @ApiOkResponse({ description: 'evento atualizado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar um evento.'})
    @ApiNotFoundResponse({ description: 'evento não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do evento a ser atualizado',
    })
    update(@Param('id') id: number, @Body() event: CreateEventDto): Promise<Event> {
        return this.eventService.update(id, event);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um evento pelo ID.' })
    @ApiOkResponse({ description: 'evento deletado com sucesso.'})
    @ApiNotFoundResponse({ description: 'evento não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do evento a ser deletado',
    })
    delete(@Param('id') id: number): Promise<Event> {
        return this.eventService.delete(id);
    }
}
