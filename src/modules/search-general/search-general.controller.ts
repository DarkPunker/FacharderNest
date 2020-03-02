import { response } from 'express';
import { SearchGeneralNeoService } from './findall.neo4j.service';
import { Controller, Post, Response, Body, HttpStatus, Get, Param } from '@nestjs/common';

@Controller('search')
export class SearchGeneralController {
    constructor(
        private searchGeneral: SearchGeneralNeoService
    ){}

    @Get(':datainput')
    async searchGeneralAll(@Response() res, @Param('datainput') datainput){
        const response = await this.searchGeneral.imputData(datainput);
        res.status(HttpStatus.OK).json(response) 
    }
    
}
