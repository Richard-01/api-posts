import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postt } from '../entity/post.entity';
import { User } from 'src/modules/users/entity/user.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Postt)
    private readonly postRepository: Repository<Postt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto, userEmail: string): Promise<Postt> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error('User not found');
    }
    const post = this.postRepository.create({
      ...createPostDto,
      creator: user,
    });
    return this.postRepository.save(post);
  }

  async getPostsByUser(userEmail: string): Promise<Postt[]> {
    const user = await this.userRepository.findOne({ where: { email: userEmail }, relations: ['posts'] });
    if (!user) {
      throw new Error('User not found');
    }
    return this.postRepository.find({ where: { creator: user, deletedAt: null } });
  }

  async getPostById(id: number, userEmail: string): Promise<Postt> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.postRepository.findOne({ where: { id, creator: user, deletedAt: null } });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto, userEmail: string): Promise<Postt> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error('User not found');
    }
    const post = await this.postRepository.findOne({ where: { id, creator: user, deletedAt: null } });
    if (post) {
      Object.assign(post, updatePostDto);
      return this.postRepository.save(post);
    }
    return null;
  }

  async softDeletePost(id: number, userEmail: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new Error('User not found');
    }
    const post = await this.postRepository.findOne({ where: { id, creator: user, deletedAt: null } });
    if (post) {
      post.deletedAt = new Date();
      await this.postRepository.save(post);
    }
  }
}
