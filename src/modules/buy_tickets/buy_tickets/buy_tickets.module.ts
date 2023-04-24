import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyTickets } from '../../../entities/buy_tickets/buy_tickets.entity';
import { BuyTicketsService } from '../../../services/buy_tickets/buy_tickets.service';
import { BuyTicketsController } from 'src/controllers/buy_tickets/buy_tickets/buy_tickets.controller';
import { TicketsService } from 'src/services/tickets/tickets.service';
import { Ticket } from 'src/entities/tickets/tickets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BuyTickets, Ticket])],
    providers: [BuyTicketsService, TicketsService],
    controllers: [BuyTicketsController]
})
export class BuyTicketsModule {}
