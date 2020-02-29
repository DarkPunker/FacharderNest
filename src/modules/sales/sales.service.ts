import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sales } from 'src/entities/sales.entity';

@Injectable()
export class SalesService {
    constructor(@InjectRepository(Sales) private readonly salesRepository: Repository<Sales>) { }



    async createSale(data: Sales): Promise<Sales> {
        try {
            return await this.salesRepository.save(data)
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
