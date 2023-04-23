import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../../entities/tickets/tickets.entity';
import { TicketsService } from '../../../services/tickets/tickets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket])],
    providers: [TicketsService]
})
export class TicketsModule {

}
