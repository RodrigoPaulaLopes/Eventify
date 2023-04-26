import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Organizer } from 'src/organizer/entities/organizer.entity';
import { OrganizerService } from './organizer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrganizerDto } from './dto/create-organizer.dto';
@ApiBearerAuth()
@ApiTags('organizer')
@Controller('organizer')
export class OrganizerController {
    constructor(private readonly organizerService: OrganizerService) { }

    @Get()
    findAll(): Promise<Organizer[]> {
        return this.organizerService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Organizer> {
        return this.organizerService.findById(id);
    }

    @Post()
    create(@Body() organizer: CreateOrganizerDto): Promise<Organizer> {
        return this.organizerService.create(organizer);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() organizer: CreateOrganizerDto): Promise<Organizer> {
        return this.organizerService.update(id, organizer);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Organizer> {
        return this.organizerService.delete(id);
    }
}
