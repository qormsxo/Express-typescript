import { EntityRepository, Repository } from 'typeorm';
import { Users } from '@entities/Users';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { Follow } from '../entities/Follow';

@EntityRepository()
class UserService extends Repository<Users> {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await Users.find();
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await Users.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async following(userId: number, followingUserId: number): Promise<void> {
    Follow.create({ followerId: userId, followingId: followingUserId }).save();
  }

  // public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   await UserEntity.update(userId, { ...userData, password: hashedPassword });

  //   const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   return updateUser;
  // }

  // public async deleteUser(userId: number): Promise<User> {
  //   if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

  //   const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   await UserEntity.delete({ id: userId });
  //   return findUser;
  // }
}

export default UserService;
