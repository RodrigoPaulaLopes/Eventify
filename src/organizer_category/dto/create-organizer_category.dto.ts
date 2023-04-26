import { ApiProperty } from '@nestjs/swagger';
import { CreateOrganizerDto } from 'src/organizer/dto/create-organizer.dto';
export class CreateOrganizerCategoryDto {
    @ApiProperty({ example: 1, description: 'Identificador único da categoria do organizador' })
    id: number;

    @ApiProperty({ example: 'Categoria A', description: 'Nome da categoria do organizador' })
    name: string;

   
}
