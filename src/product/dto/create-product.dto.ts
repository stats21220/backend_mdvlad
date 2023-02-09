import { Type } from 'class-transformer';
import {IsArray, IsNumber, IsNumberString, IsOptional, IsString, max, Max, Min, ValidateNested} from 'class-validator'
import { COUNT_PRODUCT_NOT_NUMBER, MAIN_ROUTE_ERROR, TAGS_ROUTE_NOT_ARRAY_STRING } from '../product.constants';

export class PriceProductDto {
	
	@IsString({message: 'Название единицы измерения продукта должно быть строкой'})
	name: string;

	@IsNumber({}, {message: 'Цена должна быть числом'})
	value: number;

	@IsOptional()
	@IsNumber({}, {message: COUNT_PRODUCT_NOT_NUMBER})
	count?: number;
}

export class ProductCharacteeristicsDto {

	@IsString({message: 'Название пункта характерестики дожен быть строкой'})
	title: string;

	@IsNumber({}, {message: 'Значение пункта характеристики должен быть числом или строкой'})
	@IsString()
	value: string | number;
}

export class ProductCategoryItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString()
	alias?: string;

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




/////////////////////
export class CreateProductDto {

	@IsNumber()
	productId: number;

	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	alias?: string

	@IsOptional()
	@IsString({message: MAIN_ROUTE_ERROR})
	route?: string;

	@ValidateNested()
	@Type(() => ProductCategoryLevelDto)
	categories: ProductCategoryLevelDto;

	price: PriceProductDto[];
	oldPrice?: PriceProductDto[];

	@IsOptional()
	@IsString({each: true, message: TAGS_ROUTE_NOT_ARRAY_STRING})
	categoriesRoute?: string[];

	// @ValidateNested({each: true})
	// @Type(() => ProductCharacteeristicsDto)
	characteristics: ProductCharacteeristicsDto[];

	@IsNumber()
	count: number;


	@IsNumber()
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