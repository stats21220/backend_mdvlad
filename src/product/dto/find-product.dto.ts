import { IsString } from "class-validator";

export class FindProductDto {

	@IsString({each: true})
	alias: string[];

	// @IsNumber()
	// limit: number
}
