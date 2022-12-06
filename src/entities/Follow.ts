import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('followerId', ['followerId'], {})
@Entity('follow', { schema: 'nodejs' })
export class Follow {
  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('int', { primary: true, name: 'followingId' })
  followingId: number;

  @Column('int', { primary: true, name: 'followerId' })
  followerId: number;

  @ManyToOne(() => Users, users => users.follows, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followingId', referencedColumnName: 'id' }])
  following: Users;

  @ManyToOne(() => Users, users => users.follows2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'followerId', referencedColumnName: 'id' }])
  follower: Users;
}
