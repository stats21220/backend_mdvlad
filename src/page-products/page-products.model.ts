import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export class PageCategoryItem {

	@prop()
	level: string;

	@prop()
	route?: string
}


export class LevelFirstPage {

	@prop({type: () => PageCategoryItem})
	first: PageCategoryItem;

	@prop()
	second: PageCategoryItem | undefined

 	@prop()
	third: PageCategoryItem | undefined

	@prop()
	fifth: PageCategoryItem | undefined
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

	@prop({index:true, type: () => LevelFirstPage})
	catgory: LevelFirstPage;

	@prop()
	route?: string;

}
