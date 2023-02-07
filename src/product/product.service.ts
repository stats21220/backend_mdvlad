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
			.match({categoriesRoute: {$all: dto.category}})
		// const products = await  this.productModel.aggregate()
			// .match({tagsRoute: {$all: dto.route}})
			// .project({tags: '$tagsRoute', }).exec();
		return products
	}
}


const createLevel = (dto: CreateProductDto) => {
		dto.categoriesRoute = [];
		const route = translitForUrl(dto.categories.first.level)
		const level1 = '/' + route;
		dto.categories.first.route = level1;
		dto.route = level1 + translitForUrl('/' + dto.title);
		dto.categoriesRoute?.push(route)
		
		//// обработка ошибки 2 уровня
		if (!dto.categories.second && dto.categories.third) {
			throw new HttpException('пропущен 2 уровень категории', HttpStatus.BAD_REQUEST);
		} 
		//// если все хорошо на 2 уровне
		else if (dto.categories.second) {
			const route = translitForUrl(dto.categories.second.level)
			const level2 = dto.categories.first.route + '/' + route;
			dto.categories.second.route = level2;
			dto.route = level2 + translitForUrl('/' + dto.title);
			dto.categoriesRoute?.push(route)
		} else {
			dto.categories.second = undefined;
		};

		//// обработка 3 уровня
		if (!dto.categories.third && dto.categories.fifth) {
			throw new HttpException('пропущен 3 уровень категории', HttpStatus.BAD_REQUEST);
		}
		//// если все хорошо на 3 уровне
		else if (dto.categories.second && dto.categories.third) {
				const route = translitForUrl(dto.categories.third.level);
				const level3 = dto.categories.second.route + '/' + route;
				dto.categories.third.route = level3;
				dto.route = level3 + translitForUrl('/' + dto.title);
				dto.categoriesRoute?.push(route)
		} else {
			dto.categories.third = undefined;
		};

		if (dto.categories.third && dto.categories.fifth) {
				const route = translitForUrl(dto.categories.fifth.level);
				const level4 = dto.categories.third.route + '/' + route;
				dto.categories.fifth.route = level4;
				dto.route = level4 + translitForUrl('/' + dto.title);
				dto.categoriesRoute?.push(route)
		} else {
			dto.categories.fifth = undefined;
		};
		return dto;
}