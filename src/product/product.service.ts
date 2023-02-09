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

	async delete(id: string) {
		return await this.productModel.findByIdAndDelete(id).exec()
	}

	/////////////////// обновление продукта
	async patch(id: string, dto: CreateProductDto) {

		return await this.productModel.findByIdAndUpdate(id, createLevel(dto), {new: true}).exec()
	}
	////////////////// конец обновления продукта

	async get(id: string) {
		return await this.productModel.findById(id).exec()
	}

	
	///// подумай над тегами 
	async find(dto: FindProductDto) {
		const products = await this.productModel.aggregate()
			.match({categoriesRoute: dto.category})
			.sort({weight: 1})
			.limit(dto.limit)
			.project({
				_id: '$_id', 
				productId: '$productId', 
				image: '$image', 
				title: '$title', 
				alias: '$alias',
				route: '$route',
				price: '$price',
				oldPrice: '$oldPrice',
				categoriesRoute: '$categoriesRoute',
				count: '$count',
				weight: '$weight'
			})
		// const products = await  this.productModel.aggregate()
			// .match({tagsRoute: {$all: dto.route}})
			// .project({tags: '$tagsRoute', }).exec();
		return products
	}
}


const createLevel = (dto: CreateProductDto) => {
		dto.categoriesRoute = [];
		dto.alias = translitForUrl(dto.title)
		const alias = translitForUrl(dto.categories.first.level)
		const level1 = '/' + alias;
		dto.categories.first.route = level1;
		dto.categories.first.alias = alias;
		dto.route = level1 + translitForUrl('/' + dto.title);
		dto.categoriesRoute?.push(alias)
		
		//// обработка ошибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second) {
			const alias = translitForUrl(dto.categories.second.level)
			const level2 = dto.categories.first.route + '/' + alias;
			dto.categories.second.route = level2;
			dto.categories.second.alias = alias;
			dto.route = level2 + translitForUrl('/' + dto.title);
			dto.categoriesRoute?.push(alias)
		} else {
			dto.categories.second = undefined;
		};

		//// обработка 3 уровня
		if (!dto.categories.third && dto.categories.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}
		//// если все хорошо на 3 уровне
		else if (dto.categories.second && dto.categories.third) {
				const alias = translitForUrl(dto.categories.third.level);
				const level3 = dto.categories.second.route + '/' + alias;
				dto.categories.third.route = level3;
				dto.categories.third.alias = alias;
				dto.route = level3 + translitForUrl('/' + dto.title);
				dto.categoriesRoute?.push(alias)
		} else {
			dto.categories.third = undefined;
		};

		if (dto.categories.third && dto.categories.fifth) {
				const alias = translitForUrl(dto.categories.fifth.level);
				const level4 = dto.categories.third.route + '/' + alias;
				dto.categories.fifth.route = level4;
				dto.categories.fifth.alias = alias;
				dto.route = level4 + translitForUrl('/' + dto.title);
				dto.categoriesRoute?.push(alias)
		} else {
			dto.categories.fifth = undefined;
		};
		return dto;
}