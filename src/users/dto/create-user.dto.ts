import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({ example: 1, description: 'Identificador único do usuário' })
    id: number;

    @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
    name: string;

    @ApiProperty({ example: 'joao.silva@example.com', description: 'E-mail do usuário' })
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    password: string;

    @ApiProperty({ example: '123.456.789-00', description: 'CPF do usuário' })
    cpf: string;

    @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone do usuário' })
    phone: string;

    @ApiProperty({ example: 'Rua dos Bobos, 0', description: 'Endereço do usuário' })
    address: string;

    @ApiProperty({ example: 'True ou False', description: 'Identificação para saber se o usuario é admin' })
    isAdmin: boolean
}
