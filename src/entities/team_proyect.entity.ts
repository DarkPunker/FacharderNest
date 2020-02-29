import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class TeamProyect{

    @PrimaryGeneratedColumn()
    idTeamproyect: number

    idTeam_fk: number;

    idProyect_fk:number;

    @Column('boolean')
    state:boolean;
}