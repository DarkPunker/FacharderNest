import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Role } from "../../entities/rol.entity";

@Injectable()
export class RoleNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createRole(role: Role): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (r:Role {
        id: '${role.idRol}', 
        name: '${role.name}',
      }) return r
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