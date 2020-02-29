import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Rol {
  
  @PrimaryGeneratedColumn()
  idRol: number 

  @Column('varchar',{unique: true})
  rolname: string;
}