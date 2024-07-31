import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { UserService } from '../services/user-services.module';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../../auth/dtos/login-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
