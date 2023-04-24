import { Event } from "src/entities/event/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EventCategory{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({
        nullable: false
    })
    name: string

    @OneToMany(() => Event, ev => ev.eventCategory, { cascade: true })
    events: Event[]
}