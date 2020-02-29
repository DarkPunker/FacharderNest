import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { InvoiceDetail } from "./invoice_detail.entity";

@Entity()
export class Sales {
  
  @PrimaryGeneratedColumn()
  idSales: number 

  @ManyToOne(type => User, user => user.sale)
  @JoinColumn({name: 'idClient'})
  client: User;

  @OneToMany(type => InvoiceDetail, invo => invo.services)
  invoiceDetails: InvoiceDetail[]

  @Column('int')
  value_total: number
  
  @Column('date')
  date: string;

  @Column('varchar')
  type_voucher: string;
}