import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { EventCategory } from "../event_category/event_category.entity"
import { Ticket } from 'src/tickets/tickets.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventCategory, eventCategory => eventCategory.events)
  eventCategory: EventCategory;

  @Column({
    nullable: false
  })
  name: string;

  @Column({
    nullable: false
  })
  date: Date;

  @Column({
    nullable: false
  })
  time: string;

  @Column({
    nullable: false
  })
  location: string;

  @Column({
    nullable: false
  })
  description: string;

  @OneToMany(() => Ticket, tickets => tickets.event)
  tickets: Ticket[]
}