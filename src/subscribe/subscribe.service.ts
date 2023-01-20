import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateSubscribeDto } from './dto/create.subscribe.dto';
import { SubscribeModel } from './subscribe.model';

@Injectable()
export class SubscribeService {
	constructor(@InjectModel(SubscribeModel) private readonly subscribeModel: ModelType<SubscribeModel>) {}

	async create(dto: CreateSubscribeDto) {
		return await this.subscribeModel.create(dto)
	}
}
