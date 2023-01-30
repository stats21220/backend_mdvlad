import { IsOptional, IsString } from "class-validator";

export class FindNextLevelDto {

	@IsOptional()
	@IsString()
	nextLevel?: string;
}