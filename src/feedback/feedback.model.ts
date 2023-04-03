import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export interface FeedbackModel extends Base {}
export class FeedbackModel extends TimeStamps {

	@prop()
	name: string;

	@prop()
	email: string;

	@prop()
	phone: string;

	@prop()
	description: string

	@prop()
	userId?: number
}
