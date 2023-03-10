import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class PageLevelItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString()
	alias?: string;

	@IsOptional()
	@IsString({message: 'Значение роута категории должно быть строкой'})
	route?: string;

}

export class LevelPageDto {

	@ValidateNested()
	@Type(() => PageLevelItemDto)
	first: PageLevelItemDto;

	@ValidateNested()
	@Type(() => PageLevelItemDto)
	second?: PageLevelItemDto;

	@ValidateNested()
	@Type(() => PageLevelItemDto)
	third?: PageLevelItemDto;

	@ValidateNested()
	@Type(() => PageLevelItemDto)
	fifth?: PageLevelItemDto;
}

export class CreatePageProductsDto {

	@IsNumber()
	pageId: number;

	@IsOptional()
	@IsNumber()
	sortId?: number;

	@IsString({message: 'Название страницы должно быть строкой'})
	title: string;

	@IsOptional()
	@IsString()
	alias?: string;

	@IsOptional()
	@IsString({each: true})
	categoriesRoute: string[]

	@IsString({message: 'Описание страницы должно быть строкой'})
	description: string;

	@ValidateNested()
	@Type(() => LevelPageDto)
	categories: LevelPageDto;

	@IsOptional()
	@IsString({message: 'Путь страницы должен быть строкой'})
	route?: string;

	@IsOptional()
	@IsString({message: 'Путь страницы должен быть строкой'})
	parentRoute?: string;

	@IsOptional()
	@IsString({message: 'Путь страницы должен быть строкой'})
	parentTitle?: string;
	categoriessecond: undefined;
}
