import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventCategory } from 'src/event_category/entities/event_category.entity';
import { EventCategoryService } from './event_category.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('event_category')
@Controller('event-category')
export class EventCategoryController {
    constructor(private readonly eventCategoryService: EventCategoryService) {}

    @Get()
    async findAll(): Promise<EventCategory[]> {
      return this.eventCategoryService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<EventCategory> {
      return this.eventCategoryService.findById(id);
    }
  
    @Post()
    async create(@Body() eventCategory: EventCategory): Promise<EventCategory> {
      return this.eventCategoryService.create(eventCategory);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() eventCategory: EventCategory,
    ): Promise<EventCategory> {
      return this.eventCategoryService.update(id, eventCategory);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<EventCategory> {
      return this.eventCategoryService.delete(id);
    }
}
