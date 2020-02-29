import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { RelationshipService } from "./relationship.service";
import { RoleNeoService } from "./role.neo4j.service";
import { Role } from "../../entities/rol.entity";
import {IRelationship} from './interfaces/relationship.interface';
import { userInfo } from "os";

@Injectable()
export class UserNeoService{
  constructor(
    @Inject('Neo4j') private readonly neo4j,
    private readonly roleService: RoleNeoService,
    private readonly relationshipService: RelationshipService
    ){}

  public async createUser(user: User): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:User {
        id: '${user.idUser}', 
        username: '${user.username}', 
        firstname:'${user.firstname}',
        lastname: '${user.lastname}',
        state: '${user.state}'
      }) return u
    `;
    return session
        .run(query)
        .then((result) => {
        session.close();
        return result.records.map(record => record.toObject()['u']['properties']);
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

    public async createClient(user): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Client {
        id: '${user.idUser}', 
        username: '${user.username}', 
        firstname:'${user.firstname}',
        lastname: '${user.lastname}',
        state: '${user.state}'
      }) return u
    `;
    return session
        .run(query)
        .then((result) => {
        session.close();
        return result.records.map(record => record.toObject()['u']['properties']);
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

  public async createUserAndRole(user: User): Promise<any> {
    const us = await this.createUser(user);
    const role = await this.roleService.createRole(user.roles);
    const rela = {
      nodeA: {id: String(us[0].id), type: 'User'},
      nodeB: {id: String(role[0].id), type: 'Role'},
      name: "HAS_A_ROLE"
    } as IRelationship;
    await this.relationshipService.createRelationship(rela); 
  }

  public async requestedServicePurchase(idUser: number, idSale: number): Promise<any> {
    const rela = {
      nodeA: {id: String(idUser), type: 'User'},
      nodeB: {id: String(idSale), type: 'Sale'},
      name: "REQUESTED_A"
    } as IRelationship;
    await this.relationshipService.createRelationship(rela); 
  }
}