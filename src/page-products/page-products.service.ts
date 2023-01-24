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
		
		const level1 = translitForUrl('/' + dto.catgory.first.level);
		dto.catgory.first.route = level1;
		dto.route = level1;
		
		//// обработка ошибки 2 уровня
		if (!dto.catgory.second && dto.catgory.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.catgory.second) {
			const level2 = dto.catgory.first.route +  translitForUrl('/' + dto.catgory.second?.level);
			dto.catgory.second.route = level2;
			dto.route = level2;
		} else {
			dto.catgory.second = undefined;
		};

		//// обработка 3 уровня
		if (!dto.catgory.third && dto.catgory.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}
		//// если все хорошо на 3 уровне
		else if (dto.catgory.second && dto.catgory.third) {
				const level3 = dto.catgory.second.route + translitForUrl('/' + dto.catgory.third.level);
				dto.catgory.third.level = level3;
				dto.route = level3;
		} else {
			dto.catgory.third = undefined;
		};

		if (dto.catgory.third && dto.catgory.fifth) {
				const level4 = dto.catgory.third.route + translitForUrl('/' + dto.catgory.fifth.level);
				dto.catgory.fifth.level = level4;
				dto.route = level4;
		} else {
			dto.catgory.fifth = undefined;
		};
		
		return await this.pageProductsModel.create(dto);
	};
	//// создание страницы продуктов завершено
	/////////////////////////////////////////


	/////////////////////////////////////////
	async delete(pageId: number) {
		return await this.pageProductsModel.findByIdAndDelete(pageId).exec();
	};

	async patch(pageId: number, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findByIdAndUpdate(pageId, dto).exec();
	};

	async get(pageId: number) {
		return await this.pageProductsModel.findById(pageId).exec();
	};

	async find() {
		
	};
};

