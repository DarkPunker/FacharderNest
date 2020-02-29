import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../../entities/service.entity';
import { NeoModule } from '../neo4j/neo.module';

@Module({
  imports: [NeoModule ,TypeOrmModule.forFeature([Service])],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
