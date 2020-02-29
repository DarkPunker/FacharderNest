import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Document } from '../../entities/document.entity';
import { NeoModule } from '../neo4j/neo.module';


@Module({
    imports: [NeoModule, TypeOrmModule.forFeature([Project, Document])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule { }
