import { Organizer } from "src/entities/organizer/organizer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class OrganizerCategory{


    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    name: string

    @OneToMany(() => Organizer, organizer => organizer.organizerCategory, { cascade: true })
    organizer: Organizer[]
}