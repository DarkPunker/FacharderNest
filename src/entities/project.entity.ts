import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import {Document} from './document.entity';

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
}