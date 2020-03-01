import { Controller, Get, Response, HttpStatus, Post, Delete, Param, Body } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
    constructor(private salesService: SalesService) { }

    @Get()
    async getSaless(@Response() res) {
        const response = await this.salesService.getSales();
        res.status(HttpStatus.OK).json(response)
    }

    @Post(':idUser')
    async createSales(@Response() res, @Body() project, @Param('idUser') idUser) {
        const response = await this.salesService.createSale(project, idUser);
        res.status(HttpStatus.OK).json(response)
    }

    @Delete(':idProject')
    async deleteSales(@Response() res, @Param('idProject') idProject) {
        const response = await this.salesService.deleteSale(idProject);
        res.status(HttpStatus.OK).json(response)
    }
}
