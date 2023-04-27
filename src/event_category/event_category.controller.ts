import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventCategory } from 'src/event_category/entities/event_category.entity';
import { EventCategoryService } from './event_category.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateEventCategoryDto } from './dto/create-event_category.dto';
@ApiBearerAuth()
@ApiTags('event_category')
@Controller('event-category')
export class EventCategoryController {
    constructor(private readonly eventCategoryService: EventCategoryService) {}

    @Get(':userId')
    @ApiOperation({ summary: 'Listar todas as categorias de eventos.' })
    @ApiOkResponse({ description: 'categorias eventos listadas com sucesso.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    async findAll(@Param('userId') userId: number): Promise<EventCategory[]> {
      return this.eventCategoryService.findAll(userId);
    }
  
    @Get(':id/:userId')
    @ApiOperation({ summary: 'Buscar categoria de evento pelo ID.' })
    @ApiOkResponse({ description: 'categoria de evento encontrad com sucesso.'})
    @ApiNotFoundResponse({ description: 'categoria de evento não encontrada.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria de evento a ser buscada',
    })
    async findOne(@Param('id') id: number, @Param('userId') userId: number): Promise<EventCategory> {
      return this.eventCategoryService.findById(id, userId);
    }
  
    @Post(':userId')
    @ApiOperation({ summary: 'Criar uma nova categoria de evento.' })
    @ApiCreatedResponse({ description: 'categoria de evento criada com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar uma categoria de evento.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    async create(@Body() eventCategory: CreateEventCategoryDto, @Param('userId') userId: number): Promise<EventCategory> {
      return this.eventCategoryService.create(eventCategory, userId);
    }
  
    @Put(':id/:userId')
    @ApiOperation({ summary: 'Atualizar categoria de evento pelo ID.' })
    @ApiOkResponse({ description: 'categoria de evento atualizado com sucesso.'})
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar um categoria de evento.'})
    @ApiNotFoundResponse({ description: 'categoria de evento não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria de evento a ser atualizado',
    })
    async update(
      @Param('id') id: number,
      @Param('userId') userId: number,
      @Body() eventCategory: CreateEventCategoryDto,
    ): Promise<EventCategory> {
      return this.eventCategoryService.update(id, eventCategory, userId);
    }
  
    @Delete(':id/:userId')
    @ApiOperation({ summary: 'Deletar uma categoria de evento pelo ID.' })
    @ApiOkResponse({ description: 'categoria de evento deletado com sucesso.'})
    @ApiNotFoundResponse({ description: 'categoria de evento não encontrado.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID da categoria de evento a ser deletada',
    })
    async delete(@Param('id') id: number, @Param('userId') userId: number): Promise<EventCategory> {
      return this.eventCategoryService.delete(id, userId);
    }
}
