import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateFeedbackDto } from './dto/create.feedback.dto';
import { FeedbackModel } from './feedback.model';

@Injectable()
export class FeedbackService {
	constructor(@InjectModel(FeedbackModel) private readonly feedbackModel: ModelType<FeedbackModel>) {}

	async create(dto: CreateFeedbackDto) {
		return await this.feedbackModel.create(dto)
	}
}
