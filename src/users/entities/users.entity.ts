import { ApiProperty } from '@nestjs/swagger';
import { BuyTickets } from 'src/buy_tickets/entities/buy_tickets.entity';
import { Ticket } from 'src/tickets/entities/tickets.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Identificador único do usuário' })
  @PrimaryGeneratedColumn()
  id?: number;
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @Column({
    nullable: false,
    length: 50 
  })
  name?: string;
  @ApiProperty({ example: 'joao.silva@example.com', description: 'E-mail do usuário' })
  @Column({
    nullable: false,
    length: 100,
    unique: true
  })
  email?: string;
  @ApiProperty({ example: 'senha123', description: 'Senha do usuário' })
  @Column({
    nullable: false,
    length: 255
  })
  password?: string;
  @ApiProperty({ example: '123.456.789-00', description: 'CPF do usuário' })
  @Column({
    nullable: false,
    length: 11
  })
  cpf?: string;
  @ApiProperty({ example: '(11) 99999-9999', description: 'Telefone do usuário' })
  @Column({
    nullable: false,
    length: 20
  })
  phone?: string;
  @ApiProperty({ example: 'Rua dos Bobos, 0', description: 'Endereço do usuário' })
  @Column({
    nullable: false,
    length: 255
  })
  address?: string;

  @ManyToMany(() => Ticket, ticket => ticket.users)
  @JoinTable()
  tickets?: Ticket[];

  @OneToMany(() => BuyTickets, buyTickets => buyTickets.user, { cascade: true })
  buyTickets?: BuyTickets[];
}