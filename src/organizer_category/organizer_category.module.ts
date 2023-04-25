import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerCategory } from './entities/organizer_category.entity';
import { OrganizerCategoryService } from './organizer_category.service';
import { OrganizerCategoryController } from './organizer_category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrganizerCategory])],
    providers: [OrganizerCategoryService],
    controllers: [OrganizerCategoryController]
})
export class OrganizerCategoryModule {}
