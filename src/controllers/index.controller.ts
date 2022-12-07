import { NextFunction, Request, Response } from 'express';
import IndexService from '@services/index.service';

class IndexController {
  public indexService = new IndexService();
  public mainView = async (req: Request, res: Response) => {
    const twits = await this.indexService.getAllPost();
    res.render('main', {
      title: 'NodeBird',
      twits,
    });
  };
}

export default IndexController;
