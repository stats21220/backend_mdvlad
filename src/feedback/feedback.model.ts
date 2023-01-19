import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface FeedbackModel extends Base {}
export class FeedbackModel extends TimeStamps {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	phone: string;

	@prop()
	description: string
	
	@prop()
	createdAt: Date
}
