import { Project } from './../../entities/project.entity';
import { User } from './../../entities/user.entity';
import { Injectable } from '@nestjs/common';
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
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly neoProjectService: ProjectNeoService
  ) { }

  async addDocumentToProject(data: Document, idProject: number): Promise<Project> {
    try {
      let project: Project = await this.projectRepository.findOne({where:{idProject}});
      if (project) {
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

  async createProject(data: Project, idUser: number): Promise<Project> {
    try {
      let user: User = await this.userRepository.findOne({where:{idUser}});
      data.user = user;
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

  async findDocumentByProject(idProject): Promise<any>{
    try {
      console.log(idProject);
      
    return await this.neoProjectService.findDocumentByProject(idProject);
    }catch (error){
      throw error;
    }
  }
}
