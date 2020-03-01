import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceDetail } from 'src/entities/invoice_detail.entity';
import { Sales } from '../../entities/sales.entity';
import { Service } from '../../entities/service.entity';
import { NeoModule } from '../neo4j/neo.module';

@Module({
  imports: [NeoModule, TypeOrmModule.forFeature([InvoiceDetail, Sales, Service])],
  controllers: [InvoiceController],
  providers: [InvoiceService]
})
export class InvoiceModule {}
