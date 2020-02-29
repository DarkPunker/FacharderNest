import { Controller, Get, Response, HttpStatus, Post, Delete, Body, Param } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private serviceService: ServiceService) { }

    @Get()
    async getServices(@Response() res) {
        const response = await this.serviceService.getServices();
        res.status(HttpStatus.OK).json(response)
    }

    @Post()
    async createService(@Response() res, @Body() project) {
        const response = await this.serviceService.createService(project);
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':idProject')
    async deleteService(@Response() res, @Param('idProject') idProject) {
        const response = await this.serviceService.deleteService(idProject);
        res.status(HttpStatus.OK).json(response)
    }
}
