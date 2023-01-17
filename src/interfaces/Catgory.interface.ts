
export interface ICategoryItem {
	level: string;
	route?: string
}

export interface ICategoryLevel {
	first: ICategoryItem;
	second?: ICategoryItem;
	third?: ICategoryItem;
	fifth?:  ICategoryItem;
}