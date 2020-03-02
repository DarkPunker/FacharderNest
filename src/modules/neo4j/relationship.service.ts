import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { IRelationship } from "./interfaces/relationship.interface";
import { dateNow } from '../../utils/date-util'

@Injectable()
export class RelationshipService {
  constructor(@Inject('Neo4j') private readonly neo4j) { }

  public async createRelationship(rel: IRelationship): Promise<any> {
    const session = this.neo4j.session();
    const query = `MATCH 
                      (u: ${rel.nodeA.type} {id:'${rel.nodeA.id}'}), 
                      (b: ${rel.nodeB.type} {id:'${rel.nodeB.id}'}) 
                  CREATE (u)-[:${rel.name}{date: '${dateNow}' ${rel.attrib ? ',' + rel.attrib : ''}}]->(b)`;
    console.log(query)
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

  /* (u:User{id:'28'})-[r:LOOK_IN]->(s:Service{id:'9'}) return */
  public async findByRelationship(rel: IRelationship): Promise<any> {
    const session = this.neo4j.session();
    const query = `
    MATCH (a: ${rel.nodeA.type} {id:'${rel.nodeA.id}'})
    -[r:${rel.name}]->
    (b: ${rel.nodeB.type} {id:'${rel.nodeB.id}'})
    RETURN a,r,b`;
    console.log(query)
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

  public async updateByRelationship(rel: IRelationship): Promise<any> {
    const session = this.neo4j.session();
    const query = `MATCH 
    (a: ${rel.nodeA.type} {id:'${rel.nodeA.id}'})
    -[r:${rel.name}]->
    (b: ${rel.nodeB.type} {id:'${rel.nodeB.id}'})
    SET r.count=r.count+1
    RETURN r`;
    console.log(query)
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