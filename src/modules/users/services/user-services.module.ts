import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private authenticatedUsers: Set<string> = new Set();

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      email: createUserDto.email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      this.authenticatedUsers.add(email);
      // Si la contraseña es correcta, devuelve el usuario
      return user;
    }
    return null;
  }

  isAuthenticated(email: string): boolean {
    return this.authenticatedUsers.has(email);
  }

  logout(email: string): void {
    this.authenticatedUsers.delete(email);
  }
}
