import { NextFunction, Request, Response } from 'express';
import IndexService from '@services/index.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class IndexController {
  private indexService = new IndexService();
  public mainView = async (req: Request, res: Response) => {
    const twits = await this.indexService.getAllPost();
    res.render('main', {
      title: 'NodeBird',
      twits,
    });
  };
  public middleware(req: RequestWithUser, res: Response, next: NextFunction) {
    res.locals.user = req.user;
    res.locals.followerCount = req.user ? req.user.Followers.length : 0;
    res.locals.followingCount = req.user ? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
    next();
  }
}

export default IndexController;
