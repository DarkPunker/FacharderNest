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

    @Get('findDocuments/:idProject')
    async findDocumentByProject(@Response() res,@Param('idProject') idProject) {
        const response = await this.projectService.findDocumentByProject(idProject);
        res.status(HttpStatus.OK).json(response)
    }
    
    @Get('assign-project-team/:idProject/:idTeam')
    async assignProjectToTeam(
        @Response() res, 
        @Param('idProject') idProject: number, 
        @Param('idTeam') idTeam: number
    ) {
        const response = await this.projectService.assignProjectToTeam(idProject, idTeam);
        res.status(HttpStatus.OK).json(response)
    }

    @Post()
    async createProject(@Response() res, @Body() project, iduser) {
        const response = await this.projectService.createProject(project, iduser);
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

    @Delete('deleteDocument/:idProject')
    async deleteDocument(@Response() res, @Param('idDocument') idDocument) {
        const response = await this.projectService.deleteDocument(idDocument);
        res.status(HttpStatus.OK).json(response)
    }
}
