import { EntityRepository, Repository } from 'typeorm';
import { Posts } from '@entities/Posts';
import { postCreateDto } from '../dtos/post.dto';
import { Hashtags } from '@/entities/Hashtags';
import { Posthashtag } from '@/entities/Posthashtag';

@EntityRepository()
class PostService extends Repository<Posts> {
  public async postCreate(post: postCreateDto) {
    const postData: Posts = await Posts.create(post).save();

    const hashtags: string[] = postData.content.match(/#[^\s#]*/g); //해시태그 뽑기
    if (hashtags) {
      // const promises = hashtags.map(async tag => {
      //   const findedHashtag = await Hashtags.findOne({ where: { title: tag } });
      //   if (findedHashtag) {
      //     return findedHashtag;
      //   }
      //   const createHashtags = await Hashtags.create({ title: tag }).save();
      //   console.log(createHashtags);
      //   return createHashtags;
      // });
      console.log('============================result.map====================================');
      // console.log(promises.map(r => r[0]));
      console.log('=================================================================');
    }

    return postData;
  }

  // public async craetePostHashTag() {
  //   return await Posthashtag.create({}).save();
  // }
}

export default PostService;
