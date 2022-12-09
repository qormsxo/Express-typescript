import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '@entities/Posts';

@EntityRepository()
class IndexService extends Repository<Posts> {
  public async getAllPost(): Promise<Posts[]> {
    const posts: Posts[] = await Posts.find({ relations: ['user'] });
    return posts;
  }
}

export default IndexService;
