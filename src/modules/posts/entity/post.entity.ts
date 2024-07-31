import { User } from 'src/modules/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Postt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postByUser: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne(() => User, user => user.posts)
  creator: User;

  @Column({ type: 'timestamp', nullable: true })
  estimatedPublicationDate?: Date;

  @Column({ type: 'enum', enum: ['published', 'pending'] })
  status: 'published' | 'pending';

  @Column({ type: 'int' })
  approvalPercentage: number;

  @Column({ type: 'text', nullable: true })
  corrections?: string;

  @Column({ type: 'enum', enum: ['X', 'Facebook', 'Instagram', 'LinkedIn'] })
  platform: 'X' | 'Facebook' | 'Instagram' | 'LinkedIn';

  @Column({ type: 'text', nullable: true })
  postUrl?: string;

  @Column({ type: 'text', nullable: true })
  multimediaUrl?: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
