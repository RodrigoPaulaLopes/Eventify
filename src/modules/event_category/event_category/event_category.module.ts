import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from '../../../entities/event_category/event_category.entity';
import { EventCategoryService } from '../../../services/event_category/event_category.service';
import { EventCategoryController } from 'src/controllers/event_category/event_category/event_category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory])],
    providers: [EventCategoryService],
    controllers: [EventCategoryController]
})
export class EventCategoryModule {}
