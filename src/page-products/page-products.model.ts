
export interface PageCategoryItem {
	level: string;
	route?: string
}

export interface PageCategoryLevel {
	first: PageCategoryItem;
	second?: PageCategoryItem;
	third?: PageCategoryItem;
	fifth?:  PageCategoryItem;
}

export class PageProductsModel {
	pageId: number;
	title: string;
	description: string;
	catgory: PageCategoryLevel;
	route?: string;
	parentId: number;
}
