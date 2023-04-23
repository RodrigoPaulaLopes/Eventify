import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './event_category.entity';
import { EventCategoryService } from './event_category.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory])],
    providers: [EventCategoryService]
})
export class EventCategoryModule {}
