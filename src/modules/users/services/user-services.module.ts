import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.userRepository.create({
          email: createUserDto.email,
          password: hashedPassword,
        });
        return this.userRepository.save(user);
      }
    
      async validateUser(loginUserDto: LoginDto ): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: loginUserDto.email } });
        if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
          return user;
        }
        return null;
      }
}
