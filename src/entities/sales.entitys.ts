import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Sales {
  
  @PrimaryGeneratedColumn()
  idSales: number 

  idClient_fk: number;
  
  idUser_fk: number;

  @Column('date')
  date: string;

  @Column('varchar')
  type_voucher: string;
}