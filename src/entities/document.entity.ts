import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class document {
  
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
}