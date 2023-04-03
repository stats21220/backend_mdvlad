import { IsArray, IsNumber, IsString } from "class-validator";

export class FindProductDto {

	@IsArray()
	pageId: number[];

	// @IsNumber()
	// limit: number
}
