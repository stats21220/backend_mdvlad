
export class PageCategoryItemDto {

	level: string;

	route?: string
}

export class PageCategoryLevelDto {

	first: PageCategoryItemDto;

	second?: PageCategoryItemDto;

	third?: PageCategoryItemDto;

	fifth?:  PageCategoryItemDto;
}

export class CreatePageProductsDto {

	pageId: number;

	title: string;

	description: string;

	catgory: PageCategoryLevelDto;

	route?: string;

	parentId: number;
}
