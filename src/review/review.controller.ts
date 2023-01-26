import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	HttpException, 
	HttpStatus, 
	Param, 
	Patch, 
	Post, 
	UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create.review.dto';
import { REVIEW_NOT_FOUND } from './review.constants';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	
	constructor(private readonly reviewService: ReviewService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: ReviewModel) {
		return await this.reviewService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteReview = await this.reviewService.delete(id)
		if (!deleteReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteReview
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateReviewDto) {
		const updateReview = await this.reviewService.patch(id, dto)
		if (!updateReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateReview
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		const getIdReview = await this.reviewService.get(id)
		if (!getIdReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getIdReview
	}

	@Get(':id')
	async find(@Param('id') id: string) {
		return await this.reviewService.findByProductId(id)
	}
}
