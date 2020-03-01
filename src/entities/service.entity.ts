import { Entity, Column, PrimaryGeneratedColumn, JoinColumn,  ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { InvoiceDetail } from "./invoice_detail.entity";

@Entity()
export class Service {
  
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

  @ManyToOne(type => Category, category => category.service)
  @JoinColumn({name: 'idCategory'})
  category: Category

  @OneToMany(type => InvoiceDetail, invo => invo.services)
  invoiceDetails: InvoiceDetail[]
}