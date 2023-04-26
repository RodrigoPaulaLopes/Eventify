import { ApiProperty } from '@nestjs/swagger';
export class CreateEventCategoryDto {
    @ApiProperty({ example: 1, description: 'Identificador único da categoria do evento' })
    id: number;

    @ApiProperty({ example: 'Conferência', description: 'Nome da categoria do evento' })
    name: string;
}
