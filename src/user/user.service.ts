import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

	async create(dto: CreateUserDto) {
		return await this.userModel.create(dto)
	}

	async delete(id: string) {
		return await this.userModel.findByIdAndDelete(id).exec()
	}

	async patch(id: string, dto: CreateUserDto) {
		return await this.userModel.findByIdAndUpdate(id, dto).exec()
	}

	async get(id: string) {
		return await this.userModel.findById(id).exec()
	}

	async find(dto: FindUserDto) {
		
	}
}
