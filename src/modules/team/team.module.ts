import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../../entities/team.entity';
import { User } from '../../entities/user.entity';
import { NeoModule } from '../neo4j/neo.module';

@Module({
  imports: [NeoModule ,TypeOrmModule.forFeature([Team, User])],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
