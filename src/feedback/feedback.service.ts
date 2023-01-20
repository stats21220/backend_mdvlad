import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { FeedbackModel } from './feedback.model';

@Injectable()
export class FeedbackService {
	constructor(@Inject(FeedbackModel) private readonly feedbackModel: ModelType<FeedbackModel>) {}
}
