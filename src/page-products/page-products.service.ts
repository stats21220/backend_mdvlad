import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PageProductsModel } from './page-products.model';
import {translitForUrl} from 'translit-npm';
import { first } from 'rxjs';

@Injectable()
export class PageProductsService {
	constructor(@InjectModel(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
	
	async create(dto: CreatePageProductsDto) {
		
		const level = translitForUrl('/' + dto.catgory.first.level)
		dto.catgory.first.route = level
		dto.route = level

		if (dto.catgory.first && dto.catgory.second) {
				const level = dto.catgory.first.route +  translitForUrl('/' + dto.catgory.second?.level)
				dto.catgory.second.route = level
				dto.route = level
		}

		if (dto.catgory.first && dto.catgory.second && dto.catgory.third) {
			if (dto.catgory.second === undefined) {
				throw new HttpException('not 2 level', HttpStatus.BAD_REQUEST)
			}
			const level = dto.catgory.second?.route + translitForUrl('/' + dto.catgory.third.level)
			dto.catgory.third.route = level
			dto.route = level
		}

		if (dto.catgory.fifth && dto.catgory.first && dto.catgory.second && dto.catgory.third) {
			if (dto.catgory.third === undefined) {
				throw new HttpException('not 3 level', HttpStatus.BAD_REQUEST)
			}
			const level = dto.catgory.third?.route + translitForUrl('/' + dto.catgory.fifth.level)
			dto.catgory.fifth.route = level
			dto.route = level
		}

		return await this.pageProductsModel.create(dto)
	}

	async delete(id: string) {
		return await this.pageProductsModel.findByIdAndDelete(id).exec()
	}

	async patch(id: string, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findByIdAndUpdate(id, dto).exec()
	}

	async get(id: string) {
		return await this.pageProductsModel.findById(id).exec()
	}

	async find() {
		
	}
}

