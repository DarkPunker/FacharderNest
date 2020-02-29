import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sales } from '../../entities/sales.entity';
import { Repository } from 'typeorm';
import { InvoiceDetail } from 'src/entities/invoice_detail.entity';
import { Service } from '../../entities/service.entity';
import { ParamInvoice } from '../../modules/invoice/data.inteface';
import { log } from 'util';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Sales) private readonly salesRepository: Repository<Sales>,
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        @InjectRepository(InvoiceDetail) private readonly invoiceDetailRepository: Repository<InvoiceDetail>
    ) { }
    async addInvoice_Detail(data: ParamInvoice): Promise<InvoiceDetail> {
        try {
            const{idSales, idService, price} = data
            let sale: Sales = await this.salesRepository.findOne({ where: { idSales } });
            let service: Service = await this.serviceRepository.findOne({ where: { idService } });
            let invoice = new InvoiceDetail();
            invoice.services = [service];
            invoice.sales = [sale];
            invoice.price = price;
            console.log(invoice);
            
            return await this.invoiceDetailRepository.save(invoice);
        } catch (error) {
            return error;
        }
        return null;
    }
}
