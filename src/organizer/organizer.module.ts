import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerService } from './/organizer.service';
import { OrganizerController } from './/organizer.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer])],
    providers: [OrganizerService],
    controllers: [OrganizerController]
})
export class OrganizerModule {}
