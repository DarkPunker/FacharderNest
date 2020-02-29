import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import {Document} from '../../entities/document.entity'

@Injectable()
export class DocumentNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createDocument(document: Document): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Document {
        id: '${document.idDocument}', 
        cod: '${document.cod}', 
        description: '${document.description}', 
        type: '${document.type}', 
        state: '${document.state}'
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