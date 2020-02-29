import { Controller, Response, HttpStatus, Body, Param, Delete, Post, Get } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
    constructor(private temaService: TeamService) { }

    @Get()
    async getTeams(@Response() res) {
        const response = await this.temaService.getTeams();
        res.status(HttpStatus.OK).json(response)
    }

    @Get('add-user-team/:idTeam/:idUser')
    async AddUserToTeam(@Response() res, @Param('idTeam') idTeam, @Param('idUser') idUser) {
        const response = await this.temaService.AddUserToTeam(idTeam, idUser);
        res.status(HttpStatus.OK).json(response)
    }

    @Post()
    async createTeam(@Response() res, @Body() team) {
        const response = await this.temaService.createTeam(team);
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':idTeam')
    async deleteTeam(@Response() res, @Param('idTeam') idTeam) {
        const response = await this.temaService.deleteTeam(idTeam);
        res.status(HttpStatus.OK).json(response)
    }
}
