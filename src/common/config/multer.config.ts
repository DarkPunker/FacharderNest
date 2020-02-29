import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { uuid } from '../../utils/random-generator.util';
import { dateNow } from '../../utils/date-util';

export const DiskStorage = (destImg: string) => diskStorage({
  destination: (req: any, file: any, callback: any) => {
    if (!existsSync(destImg)) {
      mkdirSync(destImg);
    }
    callback(null, destImg); 
  },
  filename: (req: any, file: any, callback: any) => {
    callback(null, `${ uuid +'-'+ dateNow}${extname(file.originalname)}`); 
  }
})

export const FileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('¡Solo se permiten archivos de imagen!'), false);
  }
  callback(null, true);
}