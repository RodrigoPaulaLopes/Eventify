
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Ticket } from 'src/tickets/entities/tickets.entity';

@Entity({ name: 'buy_tickets' })
export class BuyTickets {

    @PrimaryGeneratedColumn({ unsigned: true })
    id?: number;

    @Column({
        nullable: false
    })
    buyDate: Date;

    @Column({
        nullable: false
    })
    quantity: number

    @Column({
        nullable: false
    })
    amount: number

    @ManyToOne(() => User, user => user.buyTickets)
    user: User;

    @ManyToOne(() => Ticket, ticket => ticket.buyTickets)
    ticket: Ticket;
}