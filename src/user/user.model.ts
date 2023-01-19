import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {

	@prop()
	firstName: string;

	@prop()
	lastName: string;
	// history: string[];
}
