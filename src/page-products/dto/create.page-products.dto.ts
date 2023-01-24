import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class PageLevelItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString({message: 'Значение роута категории должно быть строкой'})
	route?: string

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

	@IsString({message: 'Название страницы должно быть строкой'})
	title: string;

	@IsString({message: 'Описание страницы должно быть строкой'})
	description: string;

	@ValidateNested()
	@Type(() => LevelPageDto)
	catgory: LevelPageDto;

	@IsOptional()
	@IsString({message: 'Путь страницы должен быть строкой'})
	route?: string;
}
