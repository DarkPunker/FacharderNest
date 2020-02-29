import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number

    @Column('varchar')
    name: string;

    @Column('varchar')
    description:string;

    @OneToMany(type => Service, service => service.category)
    service: Service;
}