import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {EventCategory} from "../event_category/event_category.entity"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventCategory, eventCategory => eventCategory.events)
  eventCategory: EventCategory;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  location: string;

  @Column()
  description: string;
}