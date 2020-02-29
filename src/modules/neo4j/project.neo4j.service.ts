import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { Project } from "../../entities/project.entity";

@Injectable()
export class ProjectNeoService{
  constructor(@Inject('Neo4j') private readonly neo4j){}

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
        return result.records.map(record => record.toObject());
      })
        .catch((error) =>
        Promise.reject(new BadRequestException(error))
      )
  }

}