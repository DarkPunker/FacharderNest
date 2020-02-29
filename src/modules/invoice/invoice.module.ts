import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from 'src/entities/invoice_detail.entity';
import { Sales } from 'src/entities/sales.entity';
import { Service } from 'src/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail, Sales, Service])],
  controllers: [InvoiceController],
  providers: [InvoiceService]
})
export class InvoiceModule {}
