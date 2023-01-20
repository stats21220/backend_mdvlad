import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: ReviewModel) {
		return await this.reviewService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.reviewService.delete(id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ReviewModel) {
		return await this.reviewService.patch(id, dto)
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		return await this.reviewService.get(id)
	}

	@Get(':id')
	async find(@Param('id') id: string) {
		return await this.reviewService.findByProductId
	}
}
