import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './common/providers/ormconfig.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { NeoModule } from './modules/neo4j/neo.module';
import { ProjectModule } from './modules/project/project.module';
import { TeamModule } from './modules/team/team.module';
import { ServiceModule } from './modules/service/service.module';
import { SalesModule } from './modules/sales/sales.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    NeoModule,  
    TypeOrmModule.forRootAsync({
    imports: [CommonModule],
    useExisting: TypeOrmConfigService,
  }),
    ProjectModule,
    TeamModule,
    ServiceModule,
    SalesModule,
    InvoiceModule
  ],
})
export class AppModule {}