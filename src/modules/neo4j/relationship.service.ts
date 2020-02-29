import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { IRelationship } from "./interfaces/relationship.interface";
import { dateNow } from '../../utils/date-util'

@Injectable()
export class RelationshipService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

  public async createRelationship(rel: IRelationship ): Promise<any> {
    const session = this.neo4j.session();
    const query = `MATCH 
                      (u: ${rel.nodeA.type} {id:'${rel.nodeA.id}'}), 
                      (b: ${rel.nodeB} {id:'${rel.nodeB.id}'}) 
                  CREATE (u)-[:${rel.name}{date: '${dateNow}'}]->(b)`;
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
   /*  
    public async findManage(idUser: string, relationship: string ): Promise<any> {
      const session = this.neo4j.session();
      this.query = `MATCH (u: User{id: '${idUser}'})-[:${relationship}]->(bots) RETURN bots`;
      console.log(this.query);
      return session
        .run(this.query) 
        .then((result) => {
          session.close();
          return result.records.map(record => record.toObject());
        })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
        )
      }

//
//
  public async deleteManage(rel: IRelationship): Promise<any> {
    const session = this.neo4j.session();
    this.query = `MATCH 
                    (u:User{ id: '${rel.idNodeA}'})-[r:${rel.name}]->(b: Bot{id: '${rel.idNodeB}'}) 
                  DELETE r`    
    console.log(this.query);
    return session
        .run(this.query)
        .then((result) => {
        session.close();
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }
 */

}