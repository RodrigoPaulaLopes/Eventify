import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { OrganizerCategoryModule } from './organizer_category/organizer_category.module';
import { OrganizerCategory } from './organizer_category/organizer_category.entity';
import { OrganizerModule } from './organizer/organizer.module';
import { Organizer } from './organizer/Organizer.entity';
import { EventCategoryModule } from './event_category/event_category.module';
import { EventModule } from './event_module/event.module';
import { Event } from './event_module/event.entity';
import { EventCategory } from './event_category/event_category.entity';
import { TicketsModule } from './tickets/tickets.module';
import { Ticket } from './tickets/tickets.entity';
import { BuyTicketsModule } from './buy_tickets/buy_tickets.module';
import { BuyTickets } from './buy_tickets/buy_tickets.entity';
import { EventService } from './event_module/event.service';

@Module({
  imports: [
  ConfigModule.forRoot(), 
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User, OrganizerCategory, Organizer, Event, EventCategory, Ticket, BuyTickets],
    synchronize: true,
  }), UsersModule, OrganizerCategoryModule, OrganizerModule, OrganizerModule, EventCategoryModule, EventModule, TicketsModule, BuyTicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
