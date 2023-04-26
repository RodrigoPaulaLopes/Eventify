import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { TicketsService } from '../tickets/tickets.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTicketDto } from './dto/create-ticket.dto';
@ApiBearerAuth()
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) { }

    @Get()
    findAll(): Promise<Ticket[]> {
        return this.ticketService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Ticket> {
        return this.ticketService.findById(id);
    }

    @Post()
    create(@Body() ticket: CreateTicketDto): Promise<Ticket> {
        return this.ticketService.create(ticket);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() ticket: CreateTicketDto): Promise<Ticket> {
        return this.ticketService.update(id, ticket);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Ticket> {
        return this.ticketService.delete(id);
    }
}
