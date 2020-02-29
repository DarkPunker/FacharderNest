import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './common/providers/ormconfig.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { NeoModule } from './modules/neo4j/neo.module';
import { ProjectModule } from './modules/project/project.module';
import { TeamModule } from './modules/team/team.module';

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
    TeamModule
  ],
})
export class AppModule {}