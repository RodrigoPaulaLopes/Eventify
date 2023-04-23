import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './tickets.entity';
import { TicketsService } from './tickets.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket])],
    providers: [TicketsService]
})
export class TicketsModule {

}
