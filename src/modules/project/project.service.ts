import { Injectable } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../entities/document.entity';
import { ProjectNeoService } from '../neo4j/project.neo4j.service';
import { Team } from '../../entities/team.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Document) private readonly documentRepository: Repository<Document>,
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly neoProjectService: ProjectNeoService
  ) { }

  async addDocumentToProject(data: Document, idProject: number): Promise<Project> {
    try {
      let project: Project = await this.projectRepository.findOne({where:{idProject}});
      if (project) {
        data.cod = uuidv4()
        const document: Document = await this.documentRepository.save({ ...data })
        project.documents = [document];
        const pro = await this.projectRepository.save(project);
        if(pro){
          await this.neoProjectService.addDocumentToProject(idProject, document)
          return pro;
        }
      } else {
        return null;
      }
     
    } catch (error) {
      return error;
    }
  }

  async assignProjectToTeam(idProject: number, idTeam: number){
    try {
      let project: Project = await this.projectRepository.findOne({where:{idProject}});
      let team: Team = await this.teamRepository.findOne({where: {idTeam}})
      team.projects = [project];
      const teamProject = await this.teamRepository.save(team);
      if(teamProject)
        await this.neoProjectService.assignProjectToTeam(idProject, idTeam);
      return team;
    } catch (error) {
      return error
    }
  }

  async createProject(data: Project): Promise<Project> {
    try {
      const project =  await this.projectRepository.save(data);
      if(project)
        this.neoProjectService.createProject(project);
      return project
    } catch (error) {
      return error;
    }
  }
  async findProject(idUser: number): Promise<Project> {
    try {
      return await this.projectRepository.findOne(idUser);
    } catch (error) {
      return error
    }
  }

  async getProjects(): Promise<Project[]> {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      return error
    }
  }

  async deleteProject(param: number): Promise<boolean> {
    try {
      const deleted = await this.projectRepository.delete(param);
      if (deleted.raw['affectedRows'] > 0)
        return true
      else
        return false
    } catch (error) {
      throw error;
    }
  }

  async deleteDocument(param: number): Promise<boolean> {
    try {
      const deleted = await this.documentRepository.delete(param);
      if (deleted.raw['affectedRows'] > 0)
        return true
      else
        return false
    } catch (error) {
      throw error;
    }
  }
}
