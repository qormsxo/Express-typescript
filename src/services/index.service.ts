import { hash } from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@dtos/users.dto';
import { Posts } from '@entities/Posts';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

@EntityRepository()
class IndexService extends Repository<Posts> {
  public async getAllPost(): Promise<Posts[]> {
    const posts: Posts[] = await Posts.find({ relations: ['user'] });
    return posts;
  }
}

export default IndexService;
