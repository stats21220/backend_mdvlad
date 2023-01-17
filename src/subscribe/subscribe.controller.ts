import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeModel } from './subscribe.model';

@Controller('subscribe')
export class SubscribeController {

	@Post('create')
	async create(@Body()  dto: SubscribeModel) {

	}
}
