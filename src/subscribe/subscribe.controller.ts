import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create.subscribe.dto';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {

	constructor(private readonly subscribeService: SubscribeService) {}

	@Post('create')
	async create(@Body()  dto: CreateSubscribeDto) {
		return await this.subscribeService.create(dto)
	}
}
