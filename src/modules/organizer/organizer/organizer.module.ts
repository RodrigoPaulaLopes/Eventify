import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from '../../../entities/organizer/organizer.entity';
import { OrganizerService } from '../../../services/organizer/organizer.service';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer])],
    providers: [OrganizerService]
})
export class OrganizerModule {}
