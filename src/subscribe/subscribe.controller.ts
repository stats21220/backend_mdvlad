import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeModel } from './subscribe.model';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {

	constructor(private readonly subscribeService: SubscribeService) {}

	@Post('create')
	async create(@Body()  dto: SubscribeModel) {
		return await this.subscribeService.create(dto)
	}
}
