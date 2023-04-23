import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerCategory } from '../../../entities/organizer_category/organizer_category.entity';
import { OrganizerCategoryService } from '../../../services/organizer_category/organizer_category.service';
import { OrganizerCategoryController } from 'src/controllers/organizer_category/organizer_category/organizer_category.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrganizerCategory])],
    providers: [OrganizerCategoryService],
    controllers: [OrganizerCategoryController]
})
export class OrganizerCategoryModule {}
