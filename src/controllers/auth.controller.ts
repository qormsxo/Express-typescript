import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import passport from 'passport';
import { RequestWithUser } from '@/interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signUpResult = await this.signUpByUserData(req.body);

      res.status(signUpResult.code).json(signUpResult);
    } catch (error) {
      next(error);
    }
  };

  // try/catch 리팩토링
  private signUpByUserData = async (userData: CreateUserDto) => {
    const signUpUserData: User = await this.authService.signup(userData);
    return {
      code: 201,
      data: signUpUserData,
      message: 'signup',
    };
  };

  // 회원가입 화면 렌더링
  public joinView(req: Request, res: Response) {
    res.render('join', { title: '회원가입 - NodeBird' });
  }

  // 로그인
  public logIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', (error: Error, user, info) => {
      if (error) {
        console.error(error);
        return next(error);
      }
      if (!user) {
        console.log(info.message);
        return res.redirect(`/?loginError=${info.message}`);
      }
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }

  // 로그아웃
  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    req.logOut(err => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.redirect('/');
      });
    });
  };
}

export default AuthController;
