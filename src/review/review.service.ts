import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from './dto/create.review.dto';
import { ReviewModel } from './review.model';


@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel) private readonly subscribeModel: ModelType<ReviewModel>) {}

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
