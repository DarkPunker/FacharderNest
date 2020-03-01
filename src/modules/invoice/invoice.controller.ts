import { Controller, Post, Body, Response, HttpStatus, Delete, Param } from '@nestjs/common';
import { SalesService } from '../sales/sales.service';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) { }

    @Post()
    async createInvoiceDetail(@Response() res, @Body() invoice) {
        const response = await this.invoiceService.addInvoice_Detail(invoice);
        res.status(HttpStatus.OK).json(response)
    }
    @Delete(':idInvoicedetail')
    async deleteSales(@Response() res, @Param('idInvoicedetail') idInvoicedetail) {
        const response = await this.invoiceService.deleteInvoise(idInvoicedetail);
        res.status(HttpStatus.OK).json(response)
    }
}
