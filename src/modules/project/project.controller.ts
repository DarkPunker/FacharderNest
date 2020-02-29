import { Controller, Get, Response, HttpStatus, Post, Body, Delete, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { response } from 'express';

@Controller('project')
export class ProjectController {
    constructor(private projectService: ProjectService) { }

    @Get()
    async getProjects(@Response() res) {
        const response = await this.projectService.getProjects();
        res.status(HttpStatus.OK).json(response)
    }

    @Post()
    async createProject(@Response() res, @Body() project) {
        const response = await this.projectService.createProject(project);
        res.status(HttpStatus.OK).json(response)
    }

    @Post(':idProject')
    async addDocumentToProject(@Response() res,@Param('idProject') idProject, @Body() document) {
        const response = await this.projectService.addDocumentToProject(document,idProject);
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':idProject')
    async deleteProject(@Response() res, @Param('idProject') idProject) {
        const response = await this.projectService.deleteProject(idProject);
        res.status(HttpStatus.OK).json(response)
    }
}
