import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './user.controller';
import { UserModel } from './user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: UserModel,
      schemaOptions: {
        collection: 'User'
      }
    }])
  ],
  controllers: [UserController]
})
export class UserModule {}
