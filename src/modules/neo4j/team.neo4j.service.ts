import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Team } from "../../entities/team.entity";

@Injectable()
export class TeamNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createTeam(team: Team): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (t:Team {
        id: '${team.idTeam}', 
        name: '${team.name}'
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
}