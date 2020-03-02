import { ConfigService } from '@nestjs/config';
import { log } from 'util';
import { Controller, Get, Param, Response, Post, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(
  private configService: ConfigService
  ) { }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(@Response() res, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response);

    res.status(HttpStatus.OK).json(response);
  }

  @Get('dowload/:nameFile')
  downloadFile(@Response() res, @Param('nameFile') nameFile) {
    return res.download(process.cwd()+this.configService.get('DESTINATION_FILES') + nameFile);
  }
}
