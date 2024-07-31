import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postt } from '../entity/post.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { AuthService } from 'src/modules/auth/services/auth-services.service';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Postt)
    private readonly postRepository: Repository<Postt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) { }

  async createPost(createPostDto: CreatePostDto, userEmail: string): Promise<Postt> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const lastPost = await this.postRepository.findOne({
      where: { creator: user },
      order: { postByUser: 'DESC' }
    });

    const newPostId = lastPost ? lastPost.postByUser + 1 : 1;

    if (!this.authService.isAuthenticated(userEmail)) {
      throw new UnauthorizedException('User not authenticated');
    }
    const post = this.postRepository.create({
      ...createPostDto,
      creator: user,
      postByUser: newPostId,
    });
    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Postt[]> {
    return this.postRepository.find({ where: { deletedAt: null } });
  }

  async getPostsByCreatorId(creatorId: number, userEmail: string): Promise<Postt[]> {
    const user = await this.userRepository.findOne({ where: { id: creatorId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!this.authService.isAuthenticated(userEmail)) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.postRepository.find({
      where: { creator: user, deletedAt: null }
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, userEmail: string): Promise<Postt> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.postRepository.findOne({ where: { id, creator: user, deletedAt: null } });
    if (post) {
      Object.assign(post, updatePostDto);
      return this.postRepository.save(post);
    }
    throw new NotFoundException('Post not found');
  }

  async softDeletePost(id: number, userEmail: string): Promise<{ message: string, post: Postt }> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.postRepository.findOne({ where: { id, creator: user, deletedAt: null } });
    if (post) {
      post.deletedAt = new Date();
      await this.postRepository.save(post);
      return {
        message: 'Post deleted successfully',
        post
      };
    } else {
      throw new NotFoundException('Post not found');
    }
  }
}
