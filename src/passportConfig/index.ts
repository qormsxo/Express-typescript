import passport from 'passport';
import local from '@/passportConfig/localStrategy';
import { Users } from '../entities/Users';
import { Follow } from '../entities/Follow';
export default () => {
  local();

  passport.serializeUser((user: Users, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    // 서브쿼리 할려고했는데 실패함 나중에 다시 찾아봄
    const follower = await Users.createQueryBuilder('why')
      .innerJoin(Follow, 'fuck', 'why.id = fuck.followerId ')
      .select(['why.id', 'why.nick'])
      .where('why.id= :id', { id })
      .getMany();

    const following = await Users.createQueryBuilder('jesus')
      .innerJoin(Follow, 'damn', 'jesus.id = damn.followingId ')
      .select(['jesus.id', 'jesus.nick'])
      .where('jesus.id= :id', { id })
      .getMany();

    Users.createQueryBuilder('users')
      .where('users.id= :id', { id })
      .getOne()
      .then(user => {
        user.Followers = follower;
        user.Followings = following;
        done(null, user);
      })
      .catch(err => done(err));
  });
};
