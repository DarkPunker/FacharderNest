import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
  
  @PrimaryGeneratedColumn()
  idRol: number 

  @Column('varchar',{unique: true})
  name: string;

  @OneToMany(type => User, user => user.roles)
  user: User
}