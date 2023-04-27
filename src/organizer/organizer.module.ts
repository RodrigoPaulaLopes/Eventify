import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organizer } from './entities/organizer.entity';
import { OrganizerService } from './/organizer.service';
import { OrganizerController } from './/organizer.controller';
import { User } from 'src/users/entities/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Organizer, User])],
    providers: [OrganizerService],
    controllers: [OrganizerController]
})
export class OrganizerModule {}
