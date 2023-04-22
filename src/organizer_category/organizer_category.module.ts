import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizerCategory } from './OrganizerCategory.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrganizerCategory])]
})
export class OrganizerCategoryModule {}
