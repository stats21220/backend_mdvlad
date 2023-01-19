

export interface PriceProductDto {
	name: string;
	value: number;
	count: number;
}

export interface ProductcharacteeristicsDto {
	title: string;
	value: string | number;
}

export interface ProductCategoryItemDto {
	level: string;
	route?: string
}

export interface ProductCategoryLevelDto {
	first: ProductCategoryItemDto;
	second?: ProductCategoryItemDto;
	third?: ProductCategoryItemDto;
	fifth?:  ProductCategoryItemDto;
}

export interface CreateProductDto {
	productId: number;
	image: string;
	calculatedRating: number;
	title: number;
	route?: string;
	categories: ProductCategoryLevelDto;
	price: PriceProductDto[];
	oldPrice?: PriceProductDto[];
	tags: string[];
	characteeristics: {[key:string]: string | number};
	count: number;
	weight: number;
	popular?: 0 | 1;
	special?: 0 | 1;
}