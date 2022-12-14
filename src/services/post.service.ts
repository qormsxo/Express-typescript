import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Posts } from '@entities/Posts';
import { postCreateDto } from '../dtos/post.dto';
import { Hashtags } from '@/entities/Hashtags';
import { Posthashtag } from '@/entities/Posthashtag';

@EntityRepository()
class PostService extends Repository<Posts> {
  public async postCreate(post: postCreateDto): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // 트랜잭션
    const postData: Posts = await queryRunner.manager.getRepository(Posts).create(post).save(); //게시글 insert
    const hashtags: string[] = postData.content.match(/#[^\s#]*/g); //해시태그 뽑기
    if (hashtags) {
      // 해시태그가 있으면
      const promises = await Promise.all(
        // 해시태그 db에 이미 값이 있으면 그거 리턴 없으면 만들고 리턴
        hashtags.map(async tag => {
          const findedHashtag = await queryRunner.manager.getRepository(Hashtags).findOne({ where: { title: tag } });
          if (findedHashtag) {
            return findedHashtag;
          }
          const createHashtags = await queryRunner.manager.getRepository(Hashtags).create({ title: tag }).save();
          return createHashtags;
        }),
      );
      promises.map(async r => {
        // postHashtag 테이블에 insert
        await queryRunner.manager
          .getRepository(Posthashtag)
          .create({
            postId: postData.id,
            hashtagId: r.id,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
          })
          .save();
      });
    }
  }

  // public async craetePostHashTag() {
  //   return await Posthashtag.create({}).save();
  // }
}

export default PostService;
