    import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

    @Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number

    @Column('varchar')
    name: string;

    @Column('varchar')
    description:string;
}