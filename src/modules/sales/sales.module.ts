import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from 'src/entities/sales.entity';
import { NeoModule } from '../neo4j/neo.module';

@Module({
  imports: [NeoModule, TypeOrmModule.forFeature([Sales])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
