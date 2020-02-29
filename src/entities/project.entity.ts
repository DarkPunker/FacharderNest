import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import {Document} from './document.entity';
import { User } from "./user.entity";

@Entity()
export class Project {
  
  @PrimaryGeneratedColumn()
  idProject: number 

  @Column('varchar',{unique: true})
  projectname: string;

  @Column('text')
  description: string;

  @Column('date')
  date: string;

  @Column('boolean')
  state: string;

  @OneToMany(type => Document, doc => doc.project)
  documents: Document[]

  @ManyToOne(type => User, user => user.projects)
  @JoinColumn({name: 'idClient'})
  user: User
}