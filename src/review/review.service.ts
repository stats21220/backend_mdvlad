import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
	constructor(@Inject(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {

	}
}
