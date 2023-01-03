import { NextFunction, Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { RequestWithUser } from '@interfaces/auth.interface';

class UsersController {
  public userService = new userService();

  public profileView(req: Request, res: Response) {
    res.render('profile', { title: '내 정보 - NodeBird' });
  }

  public addFollowing = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userService.following(req.user.id, parseInt(req.params.id));
      res.send('success');
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public deleteFollowing = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.params.id);
      await this.userService.deleteFollowing(req.user.id, parseInt(req.params.id));
      res.send('success');
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user.id;
      const { newNick } = req.body;
      await this.userService.updateUser(userId, newNick);

      res.status(200).json({ message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
