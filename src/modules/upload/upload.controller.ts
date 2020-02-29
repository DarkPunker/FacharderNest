import { Controller, Get, Param, Response, Post, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {

  @Get(':img-path') 
  findImage(@Param('img-path') imagen, @Response() res) { 
    return res.sendFile (imagen, {raíz: process.cwd()+'/images'}); 
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(@Response() res, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    res.status(HttpStatus.OK).json(response);
  }
}
