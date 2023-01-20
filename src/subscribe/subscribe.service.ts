import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose'
import { SubscribeModel } from './subscribe.model';

@Injectable()
export class SubscribeService {
	constructor(@InjectModel(SubscribeModel) private readonly subscribeModel: ModelType<SubscribeModel>) {}

	async create(dto: SubscribeModel) {
		return await this.subscribeModel.create(dto)
	}
}
