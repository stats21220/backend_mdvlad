import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

// export type priceProductKey = 'упак.' | 'шт.' | 'м2' | 'м3' 

export class PriceProduct {

	@prop()
	name: string;

	@prop()
	value: number;

	@prop()
	count: number;
}

export class Productcharacteeristics {
	
	@prop()
	title: string;

	@prop()
	value: string | number;
}

export class ProductCategoryItem {

	@prop()
	level: string;

	@prop()
	route?: string
}

export class ProductCategoryLevel {

	@prop({type: () => ProductCategoryItem})
	first: ProductCategoryItem;

	@prop({type: () => ProductCategoryItem})
	second?: ProductCategoryItem;

	@prop({type: () => ProductCategoryItem})
	third?: ProductCategoryItem;

	@prop({type: () => ProductCategoryItem})
	fifth?:  ProductCategoryItem;
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {

	@prop({unique:true})
	productId: number;

	@prop()
	image: string;

	@prop()
	calculatedRating: number;

	@prop()
	title: number;

	@prop()
	route?: string;

	@prop({type: () => ProductCategoryLevel })
	categories: ProductCategoryLevel;

	@prop({type: () => [PriceProduct]})
	price: PriceProduct[];

	@prop({type: () => [PriceProduct]})
	oldPrice?: PriceProduct[];

	@prop()
	tags: string[];

	@prop({type: () => [Productcharacteeristics]})
	characteeristics: Productcharacteeristics[];

	@prop()
	count: number;

	@prop()
	weight: number;

	@prop()
	popular?: 0 | 1;

	@prop()
	special?: 0 | 1;
}
