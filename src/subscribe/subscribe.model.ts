import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface SubscribeModel extends Base {}
export class SubscribeModel extends TimeStamps {

	@prop()
	email: string;
}
