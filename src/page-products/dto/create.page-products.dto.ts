import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class PageCategoryItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString({message: 'Значение роута категории должно быть строкой'})
	route?: string

}

export class LevelFirstPageDto {

	@ValidateNested()
	@Type(() => PageCategoryItemDto)

	@ValidateNested()
	@Type(() => PageCategoryItemDto)

	@ValidateNested()
	@Type(() => PageCategoryItemDto)
	first: PageCategoryItemDto;

	@ValidateNested()
	@Type(() => PageCategoryItemDto)
	second: PageCategoryItemDto | undefined;

	@ValidateNested()
	@Type(() => PageCategoryItemDto)
	third: PageCategoryItemDto | undefined;

	@ValidateNested()
	@Type(() => PageCategoryItemDto)
	fifth: PageCategoryItemDto | undefined;
}

export class CreatePageProductsDto {

	@IsNumber()
	pageId: number;

	@IsString({message: 'Название страницы должно быть строкой'})
	title: string;

	@IsString({message: 'Описание страницы должно быть строкой'})
	description: string;

	@ValidateNested()
	@Type(() => LevelFirstPageDto)
	catgory: LevelFirstPageDto;

	@IsOptional()
	@IsString({message: 'Путь страницы должен быть строкой'})
	route?: string;
}
