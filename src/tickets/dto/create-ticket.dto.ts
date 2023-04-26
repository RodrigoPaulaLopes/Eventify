import { ApiProperty } from '@nestjs/swagger';
import { CreateEventDto } from 'src/event/dto/create-event.dto';
export class CreateTicketDto {
    @ApiProperty({ example: 1, description: 'Identificador único do ingresso' })
    id: number;

    @ApiProperty({ example: '123456789', description: 'Código de barras do ingresso' })
    barcode: string;

    @ApiProperty({ example: '2023-05-01', description: 'Data de compra do ingresso' })
    value: number;

    @ApiProperty({ example: 50.00, description: 'Valor do ingresso' })
    quantity: number;

    @ApiProperty({ example: 1, description: 'Quantidade de ingressos comprados' })
    quantidade: number;

    @ApiProperty({ example: 1, description: 'Identificador do evento' })
    event: CreateEventDto;
}
