import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { User } from "../../entities/user.entity";

@Injectable()
export class UserNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

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
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

    public async createClient(user): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Client {
        idUser: '${user.idUser}', 
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
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }
}