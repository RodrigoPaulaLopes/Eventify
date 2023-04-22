import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class OrganizerCategory{


    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false
    })
    name: string
}