import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './Organizer.entity';
import { OrganizerService } from './organizer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer])],
    providers: [OrganizerService]
})
export class OrganizerModule {}
