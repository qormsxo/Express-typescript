import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import { isNotLoggedIn } from '../middlewares/login.middleware';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.indexController.middleware);
    this.router.get(`${this.path}`, this.indexController.mainView);
  }
}

export default IndexRoute;
