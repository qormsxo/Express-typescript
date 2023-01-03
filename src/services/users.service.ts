import { EntityRepository, Repository } from 'typeorm';
import { Users } from '@entities/Users';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Follow } from '../entities/Follow';

@EntityRepository()
class UserService extends Repository<Users> {
  public async following(userId: number, followerId: number): Promise<void> {
    // followerId : (팔로우 당하는 사람 기준) 팔로우를 건 사람.
    // followingId : (팔로우 한사람 기준) 팔로우 건 상대 (현재 로그인한 유저)
    Follow.create({ followerId: userId, followingId: followerId }).save();
  }

  public async deleteFollowing(userId: number, followingUserId: number): Promise<void> {
    Follow.delete({ followerId: userId, followingId: followingUserId });
  }

  public async updateUser(userId: number, newNick: string): Promise<void> {
    Users.update({ id: userId }, { nick: newNick });
  }
}

export default UserService;
