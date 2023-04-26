import { ApiProperty } from '@nestjs/swagger';
import { CreateOrganizerCategoryDto } from 'src/organizer_category/dto/create-organizer_category.dto';
export class CreateOrganizerDto {

    @ApiProperty({ example: 1, description: 'Identificador único do organizador' })
    id: number;

    @ApiProperty({ example: 'Empresa XYZ', description: 'Nome do organizador' })
    name: string;

    @ApiProperty({ example: 'contato@empresa.com', description: 'E-mail do organizador' })
    email: string;

    @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone do organizador' })
    phone: string;

    @ApiProperty({ example: 'Rua dos Bobos, 0', description: 'Endereço do organizador' })
    address: string;

    @ApiProperty({ example: 1, description: 'Identificador da categoria do organizador' })
    organizerCategory: CreateOrganizerCategoryDto;
}
