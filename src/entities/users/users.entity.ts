import { BuyTickets } from 'src/entities/buy_tickets/buy_tickets.entity';
import { Ticket } from 'src/entities/tickets/tickets.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
    length: 50 
  })
  name?: string;

  @Column({
    nullable: false,
    length: 100,
    unique: true
  })
  email?: string;

  @Column({
    nullable: false,
    length: 255
  })
  password?: string;

  @Column({
    nullable: false,
    length: 11
  })
  cpf?: string;

  @Column({
    nullable: false,
    length: 20
  })
  phone?: string;

  @Column({
    nullable: false,
    length: 255
  })
  address?: string;

  @ManyToMany(() => Ticket, ticket => ticket.users)
  @JoinTable()
  tickets?: Ticket[];

  @OneToMany(() => BuyTickets, buyTickets => buyTickets.user)
  buyTickets?: BuyTickets[];
}