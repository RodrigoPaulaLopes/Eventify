
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Event } from '../event/event.entity';
import { User } from 'src/entities/users/users.entity';
import { BuyTickets } from 'src/entities/buy_tickets/buy_tickets.entity';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    barcode: string;

    @Column({
        nullable: false
    })
    purchaseDate: Date;

    @Column({
        nullable: false
    })
    value: number;

    @Column({
        nullable: false
    })
    quantity: number;

    @ManyToOne(() => Event, event => event.tickets)
    event: Event;

    @ManyToMany(() => User, user => user.tickets)
    @JoinTable()
    users: User[];

    @OneToMany(() => BuyTickets, buyTickets => buyTickets.ticket)
    buyTickets: BuyTickets[];
}
