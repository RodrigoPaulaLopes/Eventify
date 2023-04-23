import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from '../../../entities/event_category/event_category.entity';
import { EventCategoryService } from '../../../services/event_category/event_category.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory])],
    providers: [EventCategoryService]
})
export class EventCategoryModule {}
