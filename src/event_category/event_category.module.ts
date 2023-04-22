import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './event_category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory])]
})
export class EventCategoryModule {}
