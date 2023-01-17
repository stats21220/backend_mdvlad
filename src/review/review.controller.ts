import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
	
	@Post('create')
	async create(@Body() dto: ReviewModel) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ReviewModel) {

	}

	@Get(':id')
	async getId(@Param('id') id: string) {

	}

	@Post()
	async find(@Body() dto: ReviewModel) {

	}
}
