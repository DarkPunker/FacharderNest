import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class service {
  
  @PrimaryGeneratedColumn()
  idService: number 

  @Column('varchar',{unique: true})
  cod: string;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('boolean')
  state: string;

  FKidCategory: number;
}