import passport from 'passport';
import local from '@/passportConfig/localStrategy';
import { Users } from '../entities/Users';
export default () => {
  local();

  passport.serializeUser((user: Users, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    Users.createQueryBuilder('users')
      .leftJoinAndSelect('users.Followers', 'follower')
      .leftJoinAndSelect('users.Followings', 'following')
      .where('users.id= :id', { id })
      .getOne()
      .then(user => done(null, user))
      .catch(err => done(err));
  });
};
