import { Type } from 'class-transformer';
import {IsArray, IsNumber, IsNumberString, IsOptional, IsString, max, Max, Min, ValidateNested} from 'class-validator'

export class PriceProductDto {
	
	@IsString({message: 'Название единицы измерения продукта должно быть строкой'})
	name: string;

	@IsNumber({}, {message: 'Цена должна быть числом'})
	value: number;

	@IsNumber({}, {message: 'Количество должно быть числом'})
	count: number;
}

export class ProductCharacteeristicsDto {

	@IsString({message: 'Название пункта характерестики дожен быть строкой'})
	title: string;

	@IsNumberString({}, {message: 'Значение пункта характеристики должен быть числом или строкой'})
	value: string | number;
}

export class ProductCategoryItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString({message: 'Значение роута категории должно быть строкой'})
	route?: string
}

export class ProductCategoryLevelDto {
	
	@ValidateNested()
	@Type(() => ProductCategoryItemDto)
	first: ProductCategoryItemDto;

	@ValidateNested()
	@Type(() => ProductCategoryItemDto)
	@IsOptional()
	second?: ProductCategoryItemDto;

	@ValidateNested()
	@Type(() => ProductCategoryItemDto)
	@IsOptional()
	third?: ProductCategoryItemDto;

	@ValidateNested()
	@Type(() => ProductCategoryItemDto)
	@IsOptional()
	fifth?:  ProductCategoryItemDto;
}

export class CreateProductDto {

	@IsNumber()
	productId: number;

	@IsString()
	image: string;

	@IsOptional()
	@Max(5, {message: 'Рейтинг должен быть не больше 5'})
	@Min(0, {message: 'Рейтинг должен быть не меньше 0'})
	@IsNumber({}, {message: 'Рейтинг должен быть числом'})
	calculatedRating?: number;

	@IsNumber()
	title: number;

	@IsOptional()
	@IsString({message: 'Главный роут страницы дожен быть строкой'})
	route?: string;
	categories: ProductCategoryLevelDto;
	price: PriceProductDto[];
	oldPrice?: PriceProductDto[];

	@IsString({each: true, message:'Теги должны быть массивом строк'})
	tags: string[];

	@ValidateNested()
	@Type(() => ProductCharacteeristicsDto)
	characteeristics: ProductCharacteeristicsDto;

	@IsNumber({}, {message: 'Количевство продукта дожно быть числом'})
	count: number;


	@IsNumber({}, {message: 'Вес продукта дожен быть числом'})
	weight: number;

	@IsOptional()
	@IsNumber({}, {message: 'Значение'})
	@Max(1, {message: 'Значение не может быть больше 1 или меньше 0'})
	@Min(0, {message: 'Значение не может быть больше 1 или меньше 0'})
	popular?: 0 | 1;

	@IsOptional()
	@IsNumber()
	@Max(1, {message: 'Значение не может быть больше 1 или меньше 0'})
	@Min(0, {message: 'Значение не может быть больше 1 или меньше 0'})
	special?: 0 | 1;
}