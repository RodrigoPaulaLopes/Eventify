import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from '../event_module/event.entity';

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
}
