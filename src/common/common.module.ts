import { Module, Global } from '@nestjs/common';
import { TypeOrmConfigService } from './providers/ormconfig.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/enviroment.config'
import { Neo4jProvider } from './providers/neo4j.provider';
import { MulterConfigService } from './providers/multer.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: process.cwd()+'/environments/development.env',
      isGlobal: true, 
    }),
  ],
  providers: [TypeOrmConfigService, Neo4jProvider, MulterConfigService],
  exports: [TypeOrmConfigService, Neo4jProvider, MulterConfigService]
})
export class CommonModule {}
