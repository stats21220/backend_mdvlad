import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class PageLevelItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString()
	alias?: string;

	@IsNumber()
	pageId: number;
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
	IdCategoryPages?: number[]

	@IsString({message: 'Описание страницы должно быть строкой'})
	description: string;

	@ValidateNested()
	@Type(() => LevelPageDto)
	categories: LevelPageDto;

	@IsOptional()
	@IsNumber()
	parentId?: number;
}
