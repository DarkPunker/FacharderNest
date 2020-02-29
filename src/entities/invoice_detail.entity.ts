import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class InvoiceDetail{
    @PrimaryGeneratedColumn()
    idInvoicedetail: number;

    idService_fk:number;

    idVenta_fk: number;

    @Column('int')
    price: number;
}