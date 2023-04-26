import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { TicketsService } from '../tickets/tickets.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
@ApiBearerAuth()
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) { }

    @Get()
    @ApiOperation({ summary: 'Listar todas os tickets.' })
    @ApiOkResponse({ description: 'tickets listadas com sucesso.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.'})
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    findAll(): Promise<Ticket[]> {
        return this.ticketService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'buscar ticket pelo id.' })
    @ApiNotFoundResponse({ description: 'Ticket não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do ticket a ser procurado',
    })
    findById(@Param('id') id: number): Promise<Ticket> {
        return this.ticketService.findById(id);
    }

    @Post()
    @ApiOperation({ summary: 'criar tickets.' })
    @ApiCreatedResponse({ description: 'O ticket foi criado com sucesso', type: Ticket })
    @ApiBadRequestResponse({ description: 'Dados inválidos para criar um tickets.'})
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    create(@Body() ticket: CreateTicketDto): Promise<Ticket> {
        return this.ticketService.create(ticket);
    }

    @Put(':id')
    @ApiOperation({ summary: 'atualizar tickets.' })
    @ApiOkResponse({ description: 'O ticket foi atualizado com sucesso', type: Ticket })
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualizar um ticket.' })
    @ApiNotFoundResponse({ description: 'Ticket não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do ticket a ser atualizado',
    })
    update(@Param('id') id: number, @Body() ticket: CreateTicketDto): Promise<Ticket> {
        return this.ticketService.update(id, ticket);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'deletar tickets.' })
    @ApiOkResponse({ description: 'O ticket foi excluído com sucesso', type: Ticket })
    @ApiNotFoundResponse({ description: 'Ticket não encontrado' })
    @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
    @ApiUnauthorizedResponse({description: "precisa de um token de acesso."})
    @ApiParam({
        name: 'id',
        type: 'integer',
        description: 'ID do ticket a ser deletado',
    })
    delete(@Param('id') id: number): Promise<Ticket> {
        return this.ticketService.delete(id);
    }
}
