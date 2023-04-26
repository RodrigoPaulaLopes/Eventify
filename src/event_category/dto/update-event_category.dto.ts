import { PartialType } from '@nestjs/swagger';
import { CreateEventCategoryDto } from './create-event_category.dto';

export class UpdateEventCategoryDto extends PartialType(CreateEventCategoryDto) {}
