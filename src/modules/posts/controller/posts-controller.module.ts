
import { Controller, Post, Get, Param, Body, Delete, Req, Put } from '@nestjs/common';
import { PostService } from '../services/posts-services.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Postt } from '../entity/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';



@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto, @Req() req): Promise<Postt> {
    const userEmail = req.user.email; // Obtener el email del usuario autenticado
    return this.postService.createPost(createPostDto, userEmail);
  }

  @Get()
  getPosts(@Req() req): Promise<Postt[]> {
    const userEmail = req.user.email; 
    return this.postService.getPostsByUser(userEmail);
  }

  @Get(':id')
  getPostById(@Param('id') id: number, @Req() req): Promise<Postt> {
    const userEmail = req.user.email;
    return this.postService.getPostById(id, userEmail);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Req() req): Promise<Postt> {
    const userEmail = req.user.email;
    return this.postService.updatePost(id, updatePostDto, userEmail);
  }

  @Delete(':id')
  softDeletePost(@Param('id') id: number, @Req() req): Promise<void> {
    const userEmail = req.user.email;
    return this.postService.softDeletePost(id, userEmail);
  }
}
