import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import {DiskStorage, FileFilter} from '../config/multer.config';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService){}
  
  destinationImages():string{
    return process.cwd() + this.configService.get('DESTINATION_FILES');
  }
  

  fileZize(): number{
    return this.configService.get('MAX_FILE_SIZE')
  }

  createMulterOptions(): MulterModuleOptions{
    return {
      dest: this.destinationImages(),
      storage: DiskStorage(this.destinationImages()),
      fileFilter: FileFilter,      
      limits: {
        fileSize: this.fileZize()
      },
    }
    
  }

}