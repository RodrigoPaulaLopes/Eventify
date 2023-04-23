import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from '../../../entities/organizer/organizer.entity';
import { OrganizerService } from '../../../services/organizer/organizer.service';
import { OrganizerController } from 'src/controllers/organizer/organizer/organizer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer])],
    providers: [OrganizerService],
    controllers: [OrganizerController]
})
export class OrganizerModule {}
