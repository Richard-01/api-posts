import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth-controller.module';
import { AuthService } from './services/auth-services.service';
import { UserService } from '../users/services/user-services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [AuthController], 
  providers: [AuthService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
