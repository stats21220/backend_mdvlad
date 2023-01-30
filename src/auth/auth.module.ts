import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { getJwtConfig } from 'src/configs/jwt-config';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
	TypegooseModule.forFeature([
		{
		typegooseClass: AuthModel,
		schemaOptions: {
			collection: 'Auth'
		}
		}
	]),
		ConfigService,
		JwtModule.registerAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: getJwtConfig
		}),
		PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService]
})
export class AuthModule {}
