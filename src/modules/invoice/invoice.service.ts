import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../../entities/sales.entity';
import { Repository } from 'typeorm';
import { InvoiceDetail } from 'src/entities/invoice_detail.entity';
import { Service } from '../../entities/service.entity';
import { ParamInvoice } from '../../modules/invoice/data.inteface';
import { SalesNeoService } from '../neo4j/sales.neo4j.service';
import { UserNeoService } from '../neo4j/user.neo4j.service';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Sales) private readonly salesRepository: Repository<Sales>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        @InjectRepository(InvoiceDetail) private readonly invoiceDetailRepository: Repository<InvoiceDetail>,
        private readonly neoSalesService: SalesNeoService,
        private readonly neoUserService: UserNeoService
    ) { }

    async addInvoice_Detail(data: ParamInvoice): Promise<InvoiceDetail> {
        try {
            const{idSales, idService, price} = data
            let sale: Sales = await this.salesRepository.findOne({ where: { idSales }, relations: ["client"] });
            let service: Service = await this.serviceRepository.findOne({ where: { idService } });
            let invoice = new InvoiceDetail();
            invoice.services = service;
            invoice.sale = sale;
            invoice.price = price;
            const invoDet = await this.invoiceDetailRepository.save(invoice);
            if(invoDet){
                await this.neoSalesService.addServiceToShoppingCart(idSales, service.idService);
                return invoDet;
            }
        } catch (error) {
            return error;
        }
    }

    async deleteInvoise(param: number): Promise<boolean> {
        try {
            const deleted = await this.invoiceDetailRepository.delete(param);
            if (deleted.raw['affectedRows'] > 0)
                return true
            else
                return false
        } catch (error) {
            throw error;
        }
    }
}
