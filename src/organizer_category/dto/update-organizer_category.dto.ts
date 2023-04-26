import { PartialType } from '@nestjs/swagger';
import { CreateOrganizerCategoryDto } from './create-organizer_category.dto';

export class UpdateOrganizerCategoryDto extends PartialType(CreateOrganizerCategoryDto) {}
