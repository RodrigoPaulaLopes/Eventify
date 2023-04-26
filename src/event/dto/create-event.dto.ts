import { ApiProperty } from '@nestjs/swagger';
import { CreateEventCategoryDto } from 'src/event_category/dto/create-event_category.dto';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';
export class CreateEventDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    eventCategory: CreateEventCategoryDto;

    @ApiProperty()
    name: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    time: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    tickets: CreateTicketDto[]


}
