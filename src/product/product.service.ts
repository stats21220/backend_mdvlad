import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { translitForUrl } from 'translit-npm';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';


@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

	async create(dto: CreateProductDto) {
		return await this.productModel.create(createLevel(dto))
	}

	async delete(productId: number) {
		return await this.productModel.findOneAndDelete({productId}).exec()
	}

	/////////////////// обновление продукта
	async patch(productId: number, dto: CreateProductDto) {
		return await this.productModel.findOneAndUpdate({productId}, createLevel(dto), {new: true}).exec()
	}
	////////////////// конец обновления продукта

	async get(productId: number) {
		return await this.productModel.findOne({productId}).exec()
	}

	
	///// подумай над тегами 
	async find(dto: FindProductDto) {
		const products = await this.productModel.aggregate()
			.match({IdCategoryPages: {$all: dto.pageId.map(id => +id)}})
			.sort({weight: 1})
			// .limit(dto.limit)
			.project({
				_id: '$_id', 
				productId: '$productId', 
				image: '$image', 
				title: '$title', 
				alias: '$alias',
				price: '$price',
				oldPrice: '$oldPrice',
				IdCategoryPages: '$IdCategoryPages',
				count: '$count',
				weight: '$weight',
				popular: '$popular',
				special: '$special'
			})
		// const products = await  this.productModel.aggregate()
			// .match({tagsRoute: {$all: dto.route}})
			// .project({tags: '$tagsRoute', }).exec();
		return products
	}

	async findPaths() {
		return await this.productModel.aggregate()
			.match({})
			.project({alias: '$alias', productId: '$productId', _id: 0})
	}
}


const createLevel = (dto: CreateProductDto) => {
		dto.image = dto.productId + '.webp'
		dto.IdCategoryPages = [];
		dto.alias = translitForUrl(dto.title)
		const alias = translitForUrl(dto.categories.first.level)
		const level1 = '/' + alias;
		dto.categories.first.alias = alias;
		dto.IdCategoryPages.push(dto.categories.first.pageId)
		
		//// обработка ошибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second) {
			if (dto.categories.first.level === dto.categories.second?.level) { 
				throw new HttpException('название уровня должно быть уникальным 2 level', HttpStatus.BAD_REQUEST);
			}
			const alias = translitForUrl(dto.categories.second.level)
			dto.categories.second.alias = alias;
			dto.IdCategoryPages?.push(dto.categories.second.pageId)
		} else {
			dto.categories.second = undefined;
		};

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
				dto.categories.third.alias = alias;
				dto.IdCategoryPages?.push(dto.categories.third.pageId)
		} else {
			dto.categories.third = undefined;
		};

		if (dto.categories.third && dto.categories.fifth) {
				if (
						dto.categories.fifth?.level === dto.categories.first?.level ||
						dto.categories.fifth?.level === dto.categories.second?.level ||
						dto.categories.fifth?.level === dto.categories.third?.level
					) { 
						throw new HttpException('название уровня должно быть уникальным 4 level', HttpStatus.BAD_REQUEST);
				}
				const alias = translitForUrl(dto.categories.fifth.level);
				dto.categories.fifth.alias = alias;
				dto.IdCategoryPages?.push(dto.categories.fifth.pageId)
		} else {
			dto.categories.fifth = undefined;
		};
		return dto;
}