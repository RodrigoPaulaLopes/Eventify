import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Organizer } from 'src/entities/organizer/organizer.entity';
import { OrganizerService } from 'src/services/organizer/organizer.service';

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
    create(@Body() organizer: Organizer): Promise<Organizer> {
        return this.organizerService.create(organizer);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() organizer: Organizer): Promise<Organizer> {
        return this.organizerService.update(id, organizer);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Organizer> {
        return this.organizerService.delete(id);
    }
}
