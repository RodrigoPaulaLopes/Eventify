import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event, User])],
    providers: [EventService],
    controllers: [EventController]
})
export class EventModule {}
