import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { UserService } from '../services/user-services.module';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login-user.dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginDto, @Req() req): Promise<any> {
    const user = await this.userService.validateUser(loginUserDto);
    if (user) {
      // Guardar la información del usuario en la sesión o en el req
      req.user = user;
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid credentials' };
    }
  }
}
