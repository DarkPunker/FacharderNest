import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Document } from '../../entities/document.entity';
import { NeoModule } from '../neo4j/neo.module';
import { Team } from '../../entities/team.entity';


@Module({
    imports: [NeoModule, TypeOrmModule.forFeature([Project, Document, Team])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule { }
