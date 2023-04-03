import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class PageCategoryItem {

	@prop()
	level: string;

	@prop()
	alias?: string;

	@prop()
	pageId: number;
}


export class LevelPage {

	@prop({type: () => PageCategoryItem})
	first: PageCategoryItem;

	@prop({type: () => PageCategoryItem})
	second?: PageCategoryItem | {};

	@prop({type: () => PageCategoryItem})
	third?: PageCategoryItem | {};

	@prop({type: () => PageCategoryItem})
	fifth?: PageCategoryItem | {};
} 



/////////////////////////////////////////////////
export interface PageProductsModel extends Base {}
export class PageProductsModel extends TimeStamps {

	@prop({unique:true})
	pageId: number;

	@prop()
	sortId?: number;

	@prop({unique:true})
	title: string;

	@prop({unique:true})
	alias?: string

	@prop()
	IdCategoryPages?: number[]

	@prop()
	description: string;

	@prop({index:true, type: () => LevelPage})
	categories: LevelPage;

	@prop({index:true})
	parentId?: number;
}
