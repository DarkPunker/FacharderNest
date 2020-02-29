import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./project.entity";
import { User } from "./user.entity";

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  idTeam: number

  @Column('varchar', { unique: true })
  name: string;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'user_team',
    joinColumns: [{ name: 'idUser' }],
    inverseJoinColumns: [{ name: 'idTeam' }]
  })
  users: User[];

  @ManyToMany(type => Project)
  @JoinTable({
    name: 'project_team',
    joinColumns: [{ name: 'idTeam' }],
    inverseJoinColumns: [{ name: 'idProject' }]
  })
  projects: Project[]
}