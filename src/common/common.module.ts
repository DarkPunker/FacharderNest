import { Module, Global } from '@nestjs/common';
import { TypeOrmConfigService } from './providers/ormconfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/enviroment.config'
import { Neo4jProvider } from './providers/neo4j.provider';
import { MulterConfigService } from './providers/multer.service';
import { MongooseModule } from '@nestjs/mongoose'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: process.cwd()+'/environments/development.env',
      isGlobal: true, 
    }),
    /* MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }) */
  ],
  providers: [TypeOrmConfigService, Neo4jProvider, MulterConfigService],
  exports: [TypeOrmConfigService, Neo4jProvider, MulterConfigService]
})
export class CommonModule {}
