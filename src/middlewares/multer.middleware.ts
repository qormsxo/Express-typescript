import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { RequestWithUser } from '../interfaces/auth.interface';

type FileNameCallback = (error: Error | null, filename: string) => void;
type DestinationCallback = (error: Error | null, destination: string) => void;
const multerConfig = {
  storage: multer.diskStorage({
    destination(req: RequestWithUser, file: Express.Multer.File, cb: DestinationCallback): void {
      cb(null, 'uploads/');
    },
    filename(req: RequestWithUser, file: Express.Multer.File, cb: FileNameCallback) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
};

export default multerConfig;
