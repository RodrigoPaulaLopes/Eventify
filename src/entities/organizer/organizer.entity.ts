
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrganizerCategory } from 'src/entities/organizer_category/organizer_category.entity';

@Entity()
export class Organizer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    phone: string;

    @Column({
        nullable: false
    })
    address: string;

    @ManyToOne(() => OrganizerCategory, organizerCategory => organizerCategory.organizer)
    organizerCategory: OrganizerCategory;
}
