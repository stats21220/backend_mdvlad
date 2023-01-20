import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(@InjectModel(AuthModel) private readonly authModel: ModelType<AuthModel>) {}

	async create(dto: AuthDto) {
		return await this.authModel.create(dto)
	}

	async find(login: string) {
		return await this.authModel.findById(login).exec()
	}

	async auth(dto: AuthDto) {
		const userLogin = await this.find(dto.login)

		if (userLogin) {
			return userLogin
		}
	}
}
