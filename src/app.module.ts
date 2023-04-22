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
import { EventModule } from './event/event.module';
import { Event } from './event/event.entity';
import { EventCategory } from './event_category/event_category.entity';


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
    entities: [User, OrganizerCategory, Organizer, Event, EventCategory],
    synchronize: true,
  }), UsersModule, OrganizerCategoryModule, OrganizerModule, OrganizerModule, EventCategoryModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {

}
