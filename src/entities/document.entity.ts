import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Project } from "./project.entity";

@Entity()
export class Document {
  
  @PrimaryGeneratedColumn()
  idDocument: number 

  @Column('varchar',{unique: true})
  cod: string;

  @Column('text')
  description: string;

  @Column('text')
  type: string;

  @Column('boolean')
  state: string;

  @ManyToOne(type => Project, pro => pro.documents)
  @JoinColumn({name: 'idProject'})
  project: Project
}