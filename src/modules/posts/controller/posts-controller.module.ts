
import { Controller, Post, Get, Param, Body, Delete, Req, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { PostService } from '../services/posts-services.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { AuthService } from 'src/modules/auth/services/auth-services.service';



@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly authService: AuthService
  ) { }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail || !this.authService.isAuthenticated(userEmail)) {
      throw new NotFoundException('User not authenticated');
    }
    return this.postService.createPost(createPostDto, userEmail);
  }

  @Get()
  async getPosts(@Req() req: Request) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail || !this.authService.isAuthenticated(userEmail)) {
      throw new NotFoundException('User not authenticated');
    }
    return this.postService.getAllPosts();
  }

  @Get('by-creator/:creatorId')
  async getPostsByCreatorId(@Param('creatorId') creatorId: number, @Req() req: Request) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail || !this.authService.isAuthenticated(userEmail)) {
      throw new NotFoundException('User not authenticated');
    }
    return this.postService.getPostsByCreatorId(creatorId, userEmail);
  }

  @Put(':id')
  async updatePost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail || !this.authService.isAuthenticated(userEmail)) {
      throw new NotFoundException('User not authenticated');
    }
    return this.postService.updatePost(id, updatePostDto, userEmail);
  }

  @Delete(':id')
  async softDeletePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request
  ) {
    const userEmail = req.headers['x-user-email'] as string;
    if (!userEmail || !this.authService.isAuthenticated(userEmail)) {
      throw new NotFoundException('User not authenticated');
    }
    return this.postService.softDeletePost(id, userEmail);
  }

}
