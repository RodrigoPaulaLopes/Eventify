import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket, User])],
    providers: [TicketsService],
    controllers: [TicketsController]
})
export class TicketsModule {

}
