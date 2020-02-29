import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './common/providers/ormconfig.service';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [  
    UserModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
    imports: [CommonModule],
    useExisting: TypeOrmConfigService,
  })
  ],
})
export class AppModule {}