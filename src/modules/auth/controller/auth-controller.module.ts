import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dtos/login-user.dto';
import { AuthService } from '../services/auth-services.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ message: string }> {
    const { email, password } = loginDto;
    const isValid = await this.authService.validateUser(email, password);
    if (isValid) {
      this.authService.login(email); // Marca al usuario como autenticado
      return { message: 'Login successful' };
    } else {
      return { message: 'Invalid email or password' };
    }
  }

  @Post('logout')
  logout(@Body('email') email: string): { message: string } {
    this.authService.logout(email); // Marca al usuario como no autenticado
    return { message: 'Logout successful' };
  }
}
