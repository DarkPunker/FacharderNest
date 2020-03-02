import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '../../common/common.module';
import { MulterConfigService } from '../../common/providers/multer.service';


@Module({
  imports: [    
    MulterModule.registerAsync({
      imports: [CommonModule],
      useExisting: MulterConfigService,
    }),
  ],
  controllers: [UploadController],
  providers: []
})
export class UploadModule {}
