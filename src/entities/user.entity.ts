import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  idUser: number 

  @Column('varchar',{unique: true})
  username: string;

  @Column('varchar')
  firstname: string;
  
  @Column('varchar')
  lastname: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true})
  state: boolean;
}