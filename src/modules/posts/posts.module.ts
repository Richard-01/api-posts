import { Module } from '@nestjs/common';
import { PostService } from './services/posts-services.service';
import { PostController } from './controller/posts-controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postt } from './entity/post.entity';
import { User } from '../users/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Postt, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
