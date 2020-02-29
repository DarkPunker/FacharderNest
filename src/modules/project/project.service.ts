import { Injectable } from '@nestjs/common';
import { Project } from 'src/entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>) { }

    
    
    async createProject(data: Project): Promise<Project> {
        try {
            return await this.projectRepository.save(data)
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

      async deleteProject(param: Project): Promise<boolean>{
        try {
          const deleted =  await this.projectRepository.delete(param.idProject);
          if(deleted.raw['affectedRows'] > 0 )
            return true
          else 
            return false
        } catch (error) {
          throw error;
        }
      }
}
