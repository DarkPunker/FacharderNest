import { Injectable } from '@nestjs/common';
import { Team } from '../../entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { log } from 'util';
import { TeamNeoService } from '../neo4j/team.neo4j.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly neoTeamService: TeamNeoService
  ) { }

  async AddUserToTeam(idTeam: number, idUser: number): Promise<Team>{
    try {
      let team: Team = await this.teamRepository.findOne({where:{idTeam}});
      let user: User = await this.userRepository.findOne({where:{idUser}});
      team.users = [user];
      const result = await this.teamRepository.save(team);
      if(result){
        this.neoTeamService.addUserToTeam(idUser, idTeam)
      }
      return result
    } catch (error) {
      return error;
    }
  }

  async createTeam(data: Team): Promise<Team> {
    try {
      const team = await this.teamRepository.save(data);
      if(team){
        await this.neoTeamService.createTeam(team);
      }
      return team;
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

  async deleteTeam(param: number): Promise<boolean> {
    try {
      const deleted = await this.teamRepository.delete(param);
      if (deleted.raw['affectedRows'] > 0)
        return true
      else
        return false
    } catch (error) {
      throw error;
    }
  }
}
