import { IsOptional, IsString } from 'class-validator';

export class FindLevelDto {

	@IsOptional()
	@IsString()
	category?: string;
}