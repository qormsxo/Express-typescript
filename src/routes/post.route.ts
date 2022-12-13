import { Router } from 'express';
import PostController from '@controllers/post.controller';
import { Routes } from '@interfaces/routes.interface';
import fs from 'fs';
import multer from 'multer';
import multerConfig from '../middlewares/multer.middleware';

class PostRoute implements Routes {
  public path = '/post';
  public router = Router();
  public postController = new PostController();
  private upload;
  private upload2;

  constructor() {
    try {
      fs.readdirSync('uploads');
    } catch (error) {
      console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
      fs.mkdirSync('uploads');
    }
    this.upload = multer(multerConfig);
    this.upload2 = multer();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/img`, this.upload.single('img'), this.postController.file);
    this.router.post(`${this.path}`, this.upload2.none(), this.postController.upload);
  }
}

export default PostRoute;
