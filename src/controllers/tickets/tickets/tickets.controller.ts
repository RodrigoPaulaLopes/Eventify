import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ticket } from 'src/entities/tickets/tickets.entity';
import { TicketsService } from 'src/services/tickets/tickets.service';

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
    create(@Body() ticket: Ticket): Promise<Ticket> {
        return this.ticketService.create(ticket);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() ticket: Ticket): Promise<Ticket> {
        return this.ticketService.update(id, ticket);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Ticket> {
        return this.ticketService.delete(id);
    }
}
