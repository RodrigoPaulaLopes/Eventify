import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from 'src/services/event/event.service';
import { Event } from 'src/entities/event/event.entity';

@Controller('event')
export class EventController {

    constructor(private readonly eventService: EventService) { }

    @Get()
    findAll(): Promise<Event[]> {
        return this.eventService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<Event> {
        return this.eventService.findById(id);
    }

    @Post()
    create(@Body() event: Event): Promise<Event> {
        return this.eventService.create(event);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() event: Event): Promise<Event> {
        return this.eventService.update(id, event);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<Event> {
        return this.eventService.delete(id);
    }
}
