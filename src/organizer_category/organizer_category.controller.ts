import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrganizerCategory } from 'src/organizer_category/entities/organizer_category.entity';
import { OrganizerCategoryService } from 'src/organizer_category/organizer_category.service';
import { CreateOrganizerCategoryDto } from './dto/create-organizer_category.dto';
@ApiBearerAuth()
@ApiTags('organizer_category')
@Controller('organizer-category')
export class OrganizerCategoryController {
    constructor(private readonly organizerCategoryService: OrganizerCategoryService) { }

    @Get()
    findAll(): Promise<OrganizerCategory[]> {
        return this.organizerCategoryService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: number): Promise<OrganizerCategory> {
        return this.organizerCategoryService.findById(id);
    }

    @Post()
    create(@Body() organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {
        return this.organizerCategoryService.create(organizerCategory);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() organizerCategory: CreateOrganizerCategoryDto): Promise<OrganizerCategory> {
        return this.organizerCategoryService.update(id, organizerCategory);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<OrganizerCategory> {
        return this.organizerCategoryService.delete(id);
    }
}
