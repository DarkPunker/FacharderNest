import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class UserTeam{
    @PrimaryGeneratedColumn()
    idUserteam: number

    idTeam_fk: number;

    idUser_fk:number;

    @Column('boolean')
    state:boolean;
}