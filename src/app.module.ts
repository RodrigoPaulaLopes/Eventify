import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/users.entity';
import { OrganizerCategory } from './organizer_category/entities/organizer_category.entity';

import { Organizer } from './organizer/entities/organizer.entity';
import { Event } from './event/entities/event.entity';
import { EventCategory } from './event_category/entities/event_category.entity';
import { Ticket } from './tickets/entities/tickets.entity';
import { BuyTickets } from './buy_tickets/entities/buy_tickets.entity';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './helpers/jwtConstants.helper';
import { UsersModule } from './users/users.module'
import { OrganizerModule } from './organizer/organizer.module';
import { OrganizerCategoryModule } from './organizer_category/organizer_category.module';
import { EventCategoryModule } from './event_category/event_category.module';
import { EventModule } from './event/event.module';
import { TicketsModule } from './tickets/tickets.module';
import { BuyTicketsModule } from './buy_tickets/buy_tickets.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT_DB),
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, OrganizerCategory, Organizer, Event, EventCategory, Ticket, BuyTickets],
      synchronize: true,
      connectTimeout: 60000
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    }), UsersModule, OrganizerCategoryModule, OrganizerModule, OrganizerModule, EventCategoryModule, EventModule, TicketsModule, BuyTicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'users', method: RequestMethod.POST}, {path: 'users/login', method: RequestMethod.POST})
      .forRoutes("*")
  }
}
