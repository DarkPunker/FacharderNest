import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { Document } from '../../entities/document.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Project, Document])],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule { }
