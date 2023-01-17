
export interface IAddress {
	city: string;
	street: string;
	home: string;
	Apartment?: string;
}

export interface IDelivery {
	title: string;
	address: IAddress;
}