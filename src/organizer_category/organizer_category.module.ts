import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerCategory } from './organizer_category.entity';
import { OrganizerCategoryService } from './organizer_category.service';

@Module({
    imports: [TypeOrmModule.forFeature([OrganizerCategory])],
    providers: [OrganizerCategoryService]
})
export class OrganizerCategoryModule {}
