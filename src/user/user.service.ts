import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class UserService {
	constructor(@Inject(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {
		
	}
}
