import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Service } from "./service.entity";
import { Sales } from "./sales.entity";

@Entity()
export class InvoiceDetail{
    @PrimaryGeneratedColumn()
    idInvoicedetail: number;

    @ManyToOne(type => Service, ser => ser.invoiceDetail)
    @JoinColumn({name: 'idService'})
    services: Service[];

    @ManyToOne(type => Sales, ser => ser.invoiceDetail)
    @JoinColumn({name: 'idSales'})
    sales: Sales[];


    @Column('int')
    price: number;
}