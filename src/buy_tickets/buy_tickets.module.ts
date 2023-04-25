import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyTickets } from './entities/buy_tickets.entity';
import { BuyTicketsService } from './buy_tickets.service';
import { BuyTicketsController } from './buy_tickets.controller';
import { TicketsService } from '../tickets/tickets.service';
import { Ticket } from 'src/tickets/entities/tickets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BuyTickets, Ticket])],
    providers: [BuyTicketsService, TicketsService],
    controllers: [BuyTicketsController]
})
export class BuyTicketsModule {}
