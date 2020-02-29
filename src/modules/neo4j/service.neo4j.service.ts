import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Service } from "../../entities/service.entity";

@Injectable()
export class ServiceNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createService(service: Service): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Service {
        id: '${service.idService}', 
        cod: '${service.cod}',
        name: '${service.name}',
        description: '${service.description}',
        state: '${service.state}',
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

}