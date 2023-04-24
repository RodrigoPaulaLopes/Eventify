import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { User } from './entities/users/users.entity';
import { OrganizerCategoryModule } from './modules/organizer_category/organizer_category/organizer_category.module';
import { OrganizerCategory } from './entities/organizer_category/organizer_category.entity';
import { OrganizerModule } from './modules/organizer/organizer/organizer.module';
import { Organizer } from './entities/organizer/organizer.entity';
import { EventCategoryModule } from './modules/event_category/event_category/event_category.module';
import { EventModule } from './modules/event/event_module/event.module';
import { Event } from './entities/event/event.entity';
import { EventCategory } from './entities/event_category/event_category.entity';
import { TicketsModule } from './modules/tickets/tickets/tickets.module';
import { Ticket } from './entities/tickets/tickets.entity';
import { BuyTicketsModule } from './modules/buy_tickets/buy_tickets/buy_tickets.module';
import { BuyTickets } from './entities/buy_tickets/buy_tickets.entity';
import { TicketsController } from './controllers/tickets/tickets/tickets.controller';




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
