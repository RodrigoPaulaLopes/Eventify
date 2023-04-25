import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { TicketsService } from '../tickets/tickets.service';
import { ApiTags } from '@nestjs/swagger';
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
