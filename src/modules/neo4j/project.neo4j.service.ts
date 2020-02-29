import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Project } from "../../entities/project.entity";
import { IRelationship } from "./interfaces/relationship.interface";
import { RelationshipService } from "./relationship.service";

@Injectable()
export class ProjectNeoService {
  constructor(
    @Inject('Neo4j') private readonly neo4j,
    private readonly relationshipService: RelationshipService
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

  public async addDocumentToProject(idProject: number, idDocument: number): Promise<any> {
    const rela = {
      nodeA: { id: String(idProject), type: 'Project' },
      nodeB: { id: String(idDocument), type: 'Document' },
      name: "HAS_A"
    } as IRelationship;
    await this.relationshipService.createRelationship(rela);
  }
}