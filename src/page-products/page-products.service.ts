import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PageProductsModel } from './page-products.model';
import {translitForUrl} from 'translit-npm';

@Injectable()
export class PageProductsService {
	constructor(@InjectModel(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
	
	async create(dto: CreatePageProductsDto) {
		return await this.pageProductsModel.create(createLevel(dto));
	};

	async delete(pageId: number) {
		return await this.pageProductsModel.findByIdAndDelete(pageId).exec();
	};

	async patch(pageId: number, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findByIdAndUpdate(pageId, createLevel(dto)).exec();
	};

	async get(pageId: number) {
		return await this.pageProductsModel.findById(pageId).exec();
	};

	async find() {
		
	};
};

const createLevel = (dto: CreatePageProductsDto) => {
		const level1 = translitForUrl('/' + dto.categories.first.level);
		dto.categories.first.route = level1;
		dto.route = level1;
		
		//// обработка оcategoriesшибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second) {
			const level2 = dto.categories.first.route +  translitForUrl('/' + dto.categories.second?.level);
			dto.categories.second.route = level2;
			dto.route = level2;
		} else {
			dto.categories.second = undefined;
		};

		//// обработка 3 уровня
		if (!dto.categories.third && dto.categories.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}
		//// если все хорошо на 3 уровне
		else if (dto.categories.second && dto.categories.third) {
				const level3 = dto.categories.second.route + translitForUrl('/' + dto.categories.third.level);
				dto.categories.third.level = level3;
				dto.route = level3;
		} else {
			dto.categories.third = undefined;
		};

		if (dto.categories.third && dto.categories.fifth) {
				const level4 = dto.categories.third.route + translitForUrl('/' + dto.categories.fifth.level);
				dto.categories.fifth.level = level4;
				dto.route = level4;
		} else {
			dto.categories.fifth = undefined;
		};
		return dto
}