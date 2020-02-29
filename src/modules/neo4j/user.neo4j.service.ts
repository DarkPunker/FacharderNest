import { Injectable, Inject, BadRequestException } from "@nestjs/common";

@Injectable()
export class UserNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createUser(): Promise<any> {
    const session = this.neo4j.session();
    const query = ``;
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