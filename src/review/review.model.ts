import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface ReviewModel extends Base {}
export class ReviewModel extends TimeStamps {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	title: string;

	@prop()
	deescription: string;

	@prop()
	rating: number;

	@prop()
	createdAt: Date;
}
