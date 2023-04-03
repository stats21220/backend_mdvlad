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

	async delete(pageId: string) {
		return await this.pageProductsModel.findOneAndDelete({pageId}).exec();
	};

	async patch(pageId: string, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findOneAndUpdate({pageId}, createLevel(dto), {new:true}).exec();
	};

	async get(pageId: number) {
		return await this.pageProductsModel.findOne({pageId}).exec()
	};

	async getPaths() {
		const paths = await this.pageProductsModel.aggregate()
			.match({})
			.project({
					_id: 0,
					categories: 0,
					title: 0,
					sortId: 0,
					IdCategoryPages: 0,
					description: 0,
					parentId: 0,
					createdAt: 0,
					updatedAt: 0,
					__v: 0,
			})
			return paths
	}

	async findAlias(alias: string) {
		const pages = await this.pageProductsModel.aggregate()
			.match({parentAlias: alias})
			.project({
					_id: '$_id',
					title: '$title',
					sortId: '$sortId',
					alias: '$alias',
					pageId: '$pageId'
		})
		return pages;
	}
		async find() {
		const pages = await this.pageProductsModel.aggregate()
			.match({})
			.sort({sortId: 1})
			.group({
				_id: '$parentId',
				pages: {$push: {					
					title: '$title',
					sortId: '$sortId',
					pageId: '$pageId',
					alias: '$alias',
					parentId: '$parentId'}}
			})
		return pages;
	};
};

const createLevel = (dto: CreatePageProductsDto) => {
		dto.alias = translitForUrl(dto.title);
		dto.IdCategoryPages = [];
		/// 1 level
		const alias = translitForUrl(dto.categories.first.level);
		dto.IdCategoryPages.push(dto.categories.first.pageId)
		dto.categories.first.alias = alias
		dto.parentId = 0;

		/// 2 Level
		//// обработка оcategoriesшибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second?.level) {
			if (dto.categories.first.level === dto.categories.second?.level) { 
				throw new HttpException('название уровня должно быть уникальным 2 level', HttpStatus.BAD_REQUEST);
			}
			const alias = translitForUrl(dto.categories.second.level);
			dto.IdCategoryPages.push(dto.categories.second.pageId);
			const parentId = dto.categories.first.pageId
			dto.categories.second.alias = alias;
			dto.parentId = parentId;
		} else {
			dto.categories.second = undefined;
		};

		/// 3 Level
		//// обработка 3 уровня
		if (!dto.categories.third && dto.categories.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}

		
		//// если все хорошо на 3 уровне
		else if (dto.categories.second && dto.categories.third) {
				if (
						dto.categories.third?.level === dto.categories.first?.level ||
						dto.categories.third?.level === dto.categories.second?.level
					) { 
						throw new HttpException('название уровня должно быть уникальным 3 level', HttpStatus.BAD_REQUEST);
				}
				const alias = translitForUrl(dto.categories.third.level);
				dto.IdCategoryPages.push(dto.categories.third.pageId)
				const parentId = dto.categories.second.pageId;
				dto.categories.third.alias = alias;
				dto.parentId = parentId;
		} else {
			dto.categories.third = undefined;
		};

		/// 4 level
		if (dto.categories.second && dto.categories.third && dto.categories.fifth) {
				if (
						dto.categories.fifth?.level === dto.categories.first?.level ||
						dto.categories.fifth?.level === dto.categories.second?.level ||
						dto.categories.fifth?.level === dto.categories.third?.level
					) { 
						throw new HttpException('название уровня должно быть уникальным 4 level', HttpStatus.BAD_REQUEST);
				}
				const alias = translitForUrl(dto.categories.fifth.level);
				dto.IdCategoryPages.push(dto.categories.fifth.pageId)
				const parentId = dto.categories.third.pageId;
				dto.categories.fifth.alias = alias;
				dto.parentId = parentId;
		} else {
			dto.categories.fifth = undefined;
		};
		return dto
}