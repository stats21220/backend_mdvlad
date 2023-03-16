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

	async getPageAlias(alias: string) {
		return await this.pageProductsModel.findOne({alias}).exec()
	};

	async find() {
		const pages = await this.pageProductsModel.aggregate()
			.match({})
			.group({_id: '$parentAlias',
				firstLevel: {$first: '$categories.first.alias'},
				secondLevel: {$first: '$categories.second.alias'},
				pages: {$push: {
					_id: '$_id',
					title: '$title',
					sortId: '$sortId',
					alias: '$alias',
					categories: {
						first: {
							level: '$categories.first.level',
							alias: '$categories.first.alias'
						},
						second: {
							level: '$categories.second.level',
							alias: '$categories.second.alias'
						},
						third: {
							level: '$categories.third.level',
							alias: '$categories.third.alias'
						},
						fifth: {
							level: '$categories.fifth.level',
							alias: '$categories.fifth.alias'
						},
					}
				}}})
		return pages;
	};
};

const createLevel = (dto: CreatePageProductsDto) => {
		dto.alias = translitForUrl(dto.title);
		dto.aliases = [];
		/// 1 level
		const alias = translitForUrl(dto.categories.first.level);
		dto.aliases.push(alias)
		dto.categories.first.alias = alias
		dto.parentAlias = '/';

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
			dto.aliases.push(alias);
			const parentAlias = dto.categories.first.alias
			dto.categories.second.alias = alias;
			dto.parentAlias = parentAlias;
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
				dto.aliases.push(alias)
				const parentAlias = dto.categories.second.alias;
				dto.categories.third.alias = alias;
				dto.parentAlias = parentAlias;
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
				dto.aliases.push(alias)
				const parentAlias = dto.categories.third.alias;
				dto.categories.fifth.alias = alias;
				dto.parentAlias = parentAlias;
		} else {
			dto.categories.fifth = undefined;
		};
		return dto
}