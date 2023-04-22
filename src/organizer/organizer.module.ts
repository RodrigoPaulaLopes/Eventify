import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './Organizer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer])]
})
export class OrganizerModule {}
