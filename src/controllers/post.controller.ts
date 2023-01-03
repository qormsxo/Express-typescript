import { NextFunction, Response } from 'express';
import PostService from '@/services/post.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { postCreateDto } from '../dtos/post.dto';
class PostController {
  public postService = new PostService();

  public upload = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const post: postCreateDto = req.body; // post 데이터 매핑
      post.userId = req.user.id;

      await this.postService.postCreate(post);

      res.redirect('/');
    } catch (error) {
      next(error);
    }
  };

  public file(req: RequestWithUser, res: Response) {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
  }
}

export default PostController;
