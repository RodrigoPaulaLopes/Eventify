import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyTickets } from '../../../entities/buy_tickets/buy_tickets.entity';
import { BuyTicketsService } from '../../../services/buy_tickets/buy_tickets.service';

@Module({
    imports: [TypeOrmModule.forFeature([BuyTickets])],
    providers: [BuyTicketsService] 
})
export class BuyTicketsModule {}
