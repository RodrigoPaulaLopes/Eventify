import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyTickets } from './buy_tickets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BuyTickets])] 
})
export class BuyTicketsModule {}
