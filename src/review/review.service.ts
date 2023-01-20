import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SubscribeModel } from 'src/subscribe/subscribe.model';
import { CreateReviewDto } from './dto/create.review.dto';


@Injectable()
export class ReviewService {
	constructor(@Inject(SubscribeModel) private readonly subscribeModel: ModelType<SubscribeModel>) {}

	async create(dto: CreateReviewDto) {
		return await this.subscribeModel.create(dto)
	}

	async delete(id: string) {
		return await this.subscribeModel.findByIdAndDelete(id)
	}

	async patch(id: string, dto: CreateReviewDto) {
		return await this.subscribeModel.findByIdAndUpdate(id, dto)
	}

	async get(id: string) {
		return await this.subscribeModel.findById(id)
	}

	async find() {
		
	}
}
