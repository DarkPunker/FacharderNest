import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from 'src/entities/sales.entity';
import { NeoModule } from '../neo4j/neo.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [NeoModule, TypeOrmModule.forFeature([Sales, User])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
