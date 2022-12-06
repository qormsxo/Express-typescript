import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posthashtag } from './Posthashtag';

@Index('title', ['title'], { unique: true })
@Entity('hashtags', { schema: 'nodejs' })
export class Hashtags {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', unique: true, length: 15 })
  title: string;

  @Column('datetime', { name: 'createdAt' })
  createdAt: Date;

  @Column('datetime', { name: 'updatedAt' })
  updatedAt: Date;

  @OneToMany(() => Posthashtag, posthashtag => posthashtag.hashtag)
  posthashtags: Posthashtag[];
}
