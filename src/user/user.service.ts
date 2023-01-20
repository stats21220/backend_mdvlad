import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(@Inject(UserModel) private readonly userModel: ModelType<UserModel>) {}

	async create(dto: UserModel) {
		return await this.userModel.create(dto)
	}

	async delete(id: string) {
		return await this.userModel.findByIdAndDelete(id)
	}

	async patch(id: string, dto: UserModel) {
		return await this.userModel.findByIdAndUpdate(id, dto)
	}

	async get(id: string) {
		return await this.userModel.findById(id)
	}

	async find() {
		
	}
}
