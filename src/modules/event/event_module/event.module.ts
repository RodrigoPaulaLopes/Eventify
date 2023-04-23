import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../../../entities/event/event.entity';
import { EventService } from '../../../services/event/event.service';

@Module({
    imports: [TypeOrmModule.forFeature([Event])],
    providers: [EventService],
})
export class EventModule {}
