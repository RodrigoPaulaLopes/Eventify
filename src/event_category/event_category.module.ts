import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategory } from './entities/event_category.entity';
import { EventCategoryService } from './event_category.service';
import { EventCategoryController } from './event_category.controller';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EventCategory, User])],
    providers: [EventCategoryService],
    controllers: [EventCategoryController]
})
export class EventCategoryModule {}
