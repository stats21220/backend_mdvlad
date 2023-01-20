import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create.subscribe.dto';

@Controller('subscribe')
export class SubscribeController {

	@Post('create')
	async create(@Body()  dto: CreateSubscribeDto) {

	}
}
