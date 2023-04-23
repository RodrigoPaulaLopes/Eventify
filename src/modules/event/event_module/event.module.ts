import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../entities/event/event.entity';
import { EventService } from '../../../services/event/event.service';
import { EventController } from 'src/controllers/event/event/event.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    providers: [EventService],
    controllers: [EventController]
})
export class EventModule {}
