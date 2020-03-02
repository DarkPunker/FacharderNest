import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Project } from "../../entities/project.entity";
import { IRelationship } from "./interfaces/relationship.interface";
import { RelationshipService } from "./relationship.service";
import {Document} from '../../entities/document.entity';
import { DocumentNeoService } from "./document.neo4j.service";

@Injectable()
export class ProjectNeoService {
  constructor(
    @Inject('Neo4j') private readonly neo4j,
    private readonly relationshipService: RelationshipService,
    private readonly documentService: DocumentNeoService
  ) { }

  public async createProject(project: Project): Promise<any> {
    const session = this.neo4j.session();
    const query = `
      CREATE (u:Project {
        id: '${project.idProject}', 
        projectname: '${project.projectname}', 
        description: '${project.description}', 
        date: '${project.date}', 
        state: '${project.state}'
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

  public async assignProjectToTeam(idProject: number, idTeam: number): Promise<any> {
    const rela = {
      nodeA: { id: String(idTeam), type: 'Team' },
      nodeB: { id: String(idProject), type: 'Project' },
      name: "HAS_ASSIGNED"
    } as IRelationship;
    await this.relationshipService.createRelationship(rela);
  }

  public async addDocumentToProject(idProject: number, document: Document): Promise<any> {

    const doc = await this.documentService.createDocument(document);
    if(doc){
      const rela = {
        nodeA: { id: String(idProject), type: 'Project' },
        nodeB: { id: String(document.idDocument), type: 'Document' },
        name: "HAS_A"
      } as IRelationship;
      await this.relationshipService.createRelationship(rela);
    }
    
  }

/*   MATCH (p:Project)-[r:HAS_A]->(d:Document) RETURN p,r,d */
  public async findDocumentByProject(idProject): Promise<any> {
    const session = this.neo4j.session();
    const query = `MATCH 
    (a:Project{id:'${idProject}'})-[r:HAS_A]->(d:Document)
    RETURN d`;
    console.log(query);
    return session
      .run(query)
      .then((result) => {
        session.close();
        return result.records.map(record => record.toObject()['d']['properties'])
      })
      .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }
}