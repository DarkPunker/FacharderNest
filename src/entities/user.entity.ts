import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Team } from "./team.entity";
import { Role } from "./rol.entity";
import { Sales } from "./sales.entity";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  idUser: number 

  @Column('varchar',{unique: true})
  username: string;

  @Column('varchar')
  firstname: string;
  
  @Column('varchar')
  lastname: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true})
  state: boolean;

  @ManyToOne(type => Role, role => role.user)
  @JoinColumn({name: 'idRole'})
  roles: Role[]

  @ManyToMany(type => Team)
  @JoinTable({
    name: 'user_team',
    joinColumns: [{name: 'idUser'}],
    inverseJoinColumns: [{name: 'idTeam'}]
  })
  teams: Team[];

  @OneToMany(type => Sales, sale => sale.client)
  sale: Sales[]
}