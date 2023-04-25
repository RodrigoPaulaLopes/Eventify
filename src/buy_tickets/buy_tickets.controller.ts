import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BuyTickets } from 'src/buy_tickets/entities/buy_tickets.entity';
import { BuyTicketsService } from 'src/buy_tickets/buy_tickets.service';

@Controller('buy-tickets')
export class BuyTicketsController {
    constructor(private readonly buyTicketsService: BuyTicketsService) {}

    @Get()
    findAll() {
      return this.buyTicketsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<any> {
      return this.buyTicketsService.findById(id);
    }
    @Get('user/:id')
    findByUserId(@Param('id') id: number): Promise<any> {
      return this.buyTicketsService.findByUserId(id);
    }
    @Get('ticket/:id')
    findByTicketId(@Param('id') id: number): Promise<any> {
      return this.buyTicketsService.findByTicketId(id);
    }
  
    @Post()
    buyTickets(@Body() buyTickets: BuyTickets) {
      return this.buyTicketsService.buyTickets(buyTickets);
    }
    @Put(':id')
    cancelPurchase(@Param('id') id: number): Promise<BuyTickets> {
        return this.buyTicketsService.cancelPurchase(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.buyTicketsService.delete(id);
    }
}
