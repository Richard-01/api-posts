import { Module } from '@nestjs/common';
import { PostService } from './services/posts-services.service';
import { PostController } from './controller/posts-controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postt } from './entity/post.entity';
import { User } from '../users/entity/user.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([Postt, User]), AuthModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostsModule {}
