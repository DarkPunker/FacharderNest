import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Team } from "../../entities/team.entity";
import { IRelationship } from "./interfaces/relationship.interface";
import { RelationshipService } from "./relationship.service";

@Injectable()
export class TeamNeoService{
  constructor(
    @Inject('Neo4j') private readonly neo4j, 
    private readonly relationService: RelationshipService
  ){}

  public async createTeam(team: Team): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (t:Team {
        id: '${team.idTeam}', 
        name: '${team.name}',
        description: '${team.description}'
      }) return t
    `;
    return session
        .run(query)
        .then((result) => {
        session.close();
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

  public async addUserToTeam(idUser: number, idTeam: number): Promise<any> {
    const rela = {
      nodeA: {id: String(idUser), type: 'User'},
      nodeB: {id: String(idTeam), type: 'Team'},
      name: "BELONGING_TO"
    } as IRelationship;
    await this.relationService.createRelationship(rela); 
  }
}