import { IsString } from "class-validator";

export class CreateFeedbackDto {

	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	phone: string;

	@IsString()
	description: string
	
}
