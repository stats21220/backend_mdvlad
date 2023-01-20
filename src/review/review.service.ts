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
		return await this.subscribeModel.findByIdAndDelete(id).exec()
	}

	async patch(id: string, dto: CreateReviewDto) {
		return await this.subscribeModel.findByIdAndUpdate(id, dto).exec()
	}

	async get(id: string) {
		return await this.subscribeModel.findById(id).exec()
	}

	async findByProductId(productId: string) {
		return await this.subscribeModel.find({productId}).exec()
	}
}
