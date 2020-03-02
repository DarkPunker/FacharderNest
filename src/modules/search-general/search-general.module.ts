import { SearchGeneralController } from './search-general.controller';
import { SearchGeneralNeoService } from './findall.neo4j.service';
import { NeoModule } from './../neo4j/neo.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
      NeoModule,],
    controllers: [SearchGeneralController],
    providers: [SearchGeneralNeoService]
  })
export class SearchGeneralModule {}
