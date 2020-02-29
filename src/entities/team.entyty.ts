import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Team {
  
  @PrimaryGeneratedColumn()
  idTeam: number 

  @Column('varchar',{unique: true})
  teamname: string;
}