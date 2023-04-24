import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../../entities/tickets/tickets.entity';
import { TicketsService } from '../../../services/tickets/tickets.service';
import { TicketsController } from 'src/controllers/tickets/tickets/tickets.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket])],
    providers: [TicketsService],
    controllers: [TicketsController]
})
export class TicketsModule {

}
