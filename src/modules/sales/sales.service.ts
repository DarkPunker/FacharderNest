import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sales } from '../../entities/sales.entity';
import { SalesNeoService } from '../neo4j/sales.neo4j.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sales) private readonly salesRepository: Repository<Sales>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly neoSalesService: SalesNeoService
        ) { }

    async createSale(data: Sales, idUser: number): Promise<Sales> {
        try {
            let user: User = await this.userRepository.findOne({where:{idUser}});
            data.client = user;
            const sales =  await this.salesRepository.save(data);
            if(sales)
                await this.neoSalesService.createRequestedServiceUser(sales, idUser);
            return sales;
        } catch (error) {
            return error;
        }
    }
    async findSale(idUser: number): Promise<Sales> {
        try {
            return await this.salesRepository.findOne(idUser);
        } catch (error) {
            return error
        }
    }

    async getSales(): Promise<Sales[]> {
        try {
            return await this.salesRepository.find();
        } catch (error) {
            return error
        }
    }

    async deleteSale(param: number): Promise<boolean> {
        try {
            const deleted = await this.salesRepository.delete(param);
            if (deleted.raw['affectedRows'] > 0)
                return true
            else
                return false
        } catch (error) {
            throw error;
        }
    }
}
