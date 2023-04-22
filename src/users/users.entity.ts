import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 50 
  })
  name: string;

  @Column({
    nullable: false,
    length: 100
  })
  email: string;

  @Column({
    nullable: false,
    length: 20
  })
  password: string;

  @Column({
    nullable: false,
    length: 11
  })
  cpf: string;

  @Column({
    nullable: false,
    length: 20
  })
  phone: string;

  @Column({
    nullable: false,
    length: 255
  })
  address: string;
}