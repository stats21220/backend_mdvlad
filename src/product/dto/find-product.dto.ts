import { IsString, IsArray, IsNumber } from "class-validator";

export class FindProductDto {

	@IsString()
	category: string;

	@IsNumber()
	limit: number
}



// import { Type } from "class-transformer";
// import { PRODUCT_FIND_NOT_ARRAY_STRING } from "../product.constants";

// export class CategoryItemDto {

// 	@IsString({message: 'Название категории должно быть строкой'})
// 	level: string;

// 	@IsOptional()
// 	@IsString({message: 'Значение роута категории должно быть строкой'})
// 	route?: string
// }


// export class FindProductCategoryDto {
	
// 	@IsOptional()
// 	@ValidateNested()
// 	@Type(() => CategoryItemDto)
// 	first?: CategoryItemDto;

// 	@ValidateNested()
// 	@Type(() => CategoryItemDto)
// 	@IsOptional()
// 	second?: CategoryItemDto;

// 	@ValidateNested()
// 	@Type(() => CategoryItemDto)
// 	@IsOptional()
// 	third?: CategoryItemDto;

// 	@ValidateNested()
// 	@Type(() => CategoryItemDto)
// 	@IsOptional()
// 	fifth?:  CategoryItemDto;
// }



// export class findProductDto {

// 	@IsOptional()
// 	first?: string;

// 	@IsOptional()
// 	@IsString()
// 	second?: string;

// 	@IsOptional()
// 	@IsString()
// 	third?: string;

// 	@IsOptional()
// 	@IsString()
// 	fifth?: string;
// 	// @IsString({each: true, message: PRODUCT_FIND_NOT_ARRAY_STRING})
// 	// route: string[];

// 	// @IsOptional()
// 	// @IsNumber()
// 	// limit?: number;
// };
