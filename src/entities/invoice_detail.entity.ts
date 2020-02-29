import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Service } from "./service.entity";
import { Sales } from "./sales.entity";

@Entity()
export class InvoiceDetail{
    @PrimaryGeneratedColumn()
    idInvoicedetail: number;

    @ManyToOne(type => Service, ser => ser.invoiceDetails)
    @JoinColumn({name: 'idService'})
    services: Service;

    @ManyToOne(type => Sales, ser => ser.invoiceDetails)
    @JoinColumn({name: 'idSales'})
    sale: Sales;


    @Column('int')
    price: number;
}