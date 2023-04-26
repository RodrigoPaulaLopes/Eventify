
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Event } from '../../event/entities/event.entity';
import { User } from 'src/users/entities/users.entity';
import { BuyTickets } from 'src/buy_tickets/entities/buy_tickets.entity';

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable: false
    })
    barcode?: string;


    @Column({
        nullable: false,
        type: 'decimal', precision: 10, scale: 2 
    })
    value?: number;

    @Column({
        nullable: false
    })
    quantity?: number;

    @ManyToOne(() => Event, event => event.tickets)
    event?: Event;

    @ManyToMany(() => User, user => user.tickets)
    @JoinTable()
    users?: User[];

    @OneToMany(() => BuyTickets, buyTickets => buyTickets.ticket, { cascade: true })
    buyTickets?: BuyTickets[];
}
