import { Module } from '@nestjs/common';
import { UserController } from './controller/user-controller.module';
import { UserService } from './services/user-services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
