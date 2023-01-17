export type priceKey = 'упак.' | 'шт.' | 'м2' | 'м3' 

export interface IPrice {
	name: priceKey;
	value: number;
	count: number;
}