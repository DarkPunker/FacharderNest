import { Injectable } from '@nestjs/common';
import { Team } from '../../entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(Team) private readonly teamRepository: Repository<Team>) { }

    
    
    async createTeam(data: Team): Promise<Team> {
        try {
            return await this.teamRepository.save(data)
        } catch (error) {
            return error;
        }
    }
    async findTeam(idUser: number): Promise<Team> {
        try {
          return await this.teamRepository.findOne(idUser);
        } catch (error) {
          return error
        }
      }
    
      async getTeams(): Promise<Team[]> {
        try {
          return await this.teamRepository.find();
        } catch (error) {
          return error
        }
      }

      async deleteTeam(param: number): Promise<boolean>{
        try {
          const deleted =  await this.teamRepository.delete(param);
          if(deleted.raw['affectedRows'] > 0 )
            return true
          else 
            return false
        } catch (error) {
          throw error;
        }
      }
}
