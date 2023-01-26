import { Type } from "class-transformer";
import { IsString, IsOptional, ValidateNested } from "class-validator";

export class CategoryItemDto {

	@IsString({message: 'Название категории должно быть строкой'})
	level: string;

	@IsOptional()
	@IsString({message: 'Значение роута категории должно быть строкой'})
	route?: string
}


export class FindProductCategoryDto {
	
	@ValidateNested()
	@Type(() => CategoryItemDto)
	first?: CategoryItemDto;

	@ValidateNested()
	@Type(() => CategoryItemDto)
	@IsOptional()
	second?: CategoryItemDto;

	@ValidateNested()
	@Type(() => CategoryItemDto)
	@IsOptional()
	third?: CategoryItemDto;

	@ValidateNested()
	@Type(() => CategoryItemDto)
	@IsOptional()
	fifth?:  CategoryItemDto;
}