import { ApiProperty } from '@nestjs/swagger';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export class CreateBuyTicketDto {
    @ApiProperty({ example: 1, description: 'Identificador único da compra do ingresso' })
    id: number;

    @ApiProperty({ example: '2023-04-25', description: 'Data da compra dos ingressos' })
    buyDate: Date;
    
    @ApiProperty({ example: 2, description: 'Quantidade de ingressos comprados' })
    quantity: number;

    @ApiProperty({ example: 100.00, description: 'Valor total da compra dos ingressos' })
    amount: number;


    @ApiProperty({ example: 1, description: 'Identificador do usuário que fez a compra' })
    user: CreateUserDto;

    @ApiProperty({ example: 1, description: 'Identificador do ingresso comprado' })
    ticket: CreateTicketDto;
}
