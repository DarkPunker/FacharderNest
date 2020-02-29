import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';
import { ServiceNeoService } from '../neo4j/service.neo4j.service';

@Injectable()
export class ServiceService {
    constructor(
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        private readonly neoServService: ServiceNeoService
    ) { }



    async createService(data: Service): Promise<Service> {
        try {
            const service =  await this.serviceRepository.save(data);
            if(service)
                await this.neoServService.createService(service);
            return service;
        } catch (error) {
            return error;
        }
    }
    async findService(idUser: number): Promise<Service> {
        try {
            return await this.serviceRepository.findOne(idUser);
        } catch (error) {
            return error
        }
    }

    async getServices(): Promise<Service[]> {
        try {
            return await this.serviceRepository.find();
        } catch (error) {
            return error
        }
    }

    async deleteService(param: number): Promise<boolean> {
        try {
            const deleted = await this.serviceRepository.delete(param);
            if (deleted.raw['affectedRows'] > 0)
                return true
            else
                return false
        } catch (error) {
            throw error;
        }
    }
}
