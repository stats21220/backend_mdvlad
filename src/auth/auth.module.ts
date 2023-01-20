import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModel,
        schemaOptions: {
          collection: 'Auth'
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
