import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class PageCategoryItem {

	@prop()
	level: string;

	@prop()
	route?: string
}


export class LevelPage {

	@prop({type: () => PageCategoryItem})
	first: PageCategoryItem;

	@prop({type: () => PageCategoryItem})
	second?: PageCategoryItem | {}

	@prop({type: () => PageCategoryItem})
	third?: PageCategoryItem | {}

	@prop({type: () => PageCategoryItem})
	fifth?: PageCategoryItem | {}
} 



/////////////////////////////////////////////////
export interface PageProductsModel extends Base {}
export class PageProductsModel extends TimeStamps {

	@prop({unique:true})
	pageId: number;

	@prop()
	title: string;

	@prop()
	description: string;

	@prop({index:true, type: () => LevelPage})
	catgory: LevelPage;

	@prop()
	route?: string;

}
