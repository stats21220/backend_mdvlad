import { Body, Controller, Post } from '@nestjs/common';
import { FeedbackModel } from './feedback.model';

@Controller('feedback')
export class FeedbackController {

	@Post('create')
	async create(@Body() dto: FeedbackModel) {
		
	}
}
