import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Team {
  
  @PrimaryGeneratedColumn()
  idTeam: number 

  @Column('varchar',{unique: true})
  name: string;

  @ManyToMany(type => Project)
  @JoinTable({
    name: 'project_team',
    joinColumns: [{name: 'idTeam'}],
    inverseJoinColumns: [{name: 'idProject'}]
  })
  projects: Project[]
}