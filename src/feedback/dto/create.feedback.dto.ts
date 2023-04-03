import { IsString } from "class-validator";

export class CreateFeedbackDto {

	@IsString()
	name: string;

	@IsString()
	email: string;

	@IsString()
	phone: string;

	@IsString()
	description: string
	
}
