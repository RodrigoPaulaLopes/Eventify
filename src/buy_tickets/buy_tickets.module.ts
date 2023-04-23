import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyTickets } from './buy_tickets.entity';
import { BuyTicketsService } from './buy_tickets.service';

@Module({
    imports: [TypeOrmModule.forFeature([BuyTickets])],
    providers: [BuyTicketsService] 
})
export class BuyTicketsModule {}
