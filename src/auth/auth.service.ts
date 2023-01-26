import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';
import { genSalt, hash, compare } from 'bcryptjs';
import { ALREADY_REGISTEERED_ERROR, AUTH_NOT_FOUND } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>,
		private readonly jwtService: JwtService) {}

	async create(dto: AuthDto) {

		const oldRegister = await this.find(dto.login)

		if (oldRegister) {
			throw new HttpException(ALREADY_REGISTEERED_ERROR, HttpStatus.BAD_REQUEST)
		}

		const salt = await genSalt(10);

		const newAuth = {
			email: dto.login,
			passwordHash: await hash(dto.password, salt)
		}

		return await this.authModel.create(newAuth);
	};

	async find(email: string) {
		return await this.authModel.findOne({email}).exec();
	};

	async validationAuth(email: string, password: string) {
		const userLogin = await this.find(email);

		if (!userLogin) {
			throw new UnauthorizedException(AUTH_NOT_FOUND);
		};

		const isCorrectPassword = compare(password, userLogin.passwordHash)

		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		};

		return {email: userLogin.email};
	};

	async login(email: string) {
		const payload = {email}
		return {
			access_token: await this.jwtService.signAsync(payload)
		}
	}
}
