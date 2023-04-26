import { ApiProperty } from '@nestjs/swagger';
export class CreateLoginDto {

    @ApiProperty({ example: 'joao.silva@example.com', description: 'E-mail do usuário' })
    email: string;

    @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
    password: string;
}
