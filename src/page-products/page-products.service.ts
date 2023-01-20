import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PageProductsModel } from './page-products.model';

@Injectable()
export class PageProductsService {
	constructor(@Inject(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
	
	async create(dto: PageProductsModel) {
		return await this.pageProductsModel.create(dto)
	}

	async delete(id: string) {
		return await this.pageProductsModel.findByIdAndDelete(id)
	}

	async patch(id: string, dto: PageProductsModel) {
		return await this.pageProductsModel.findByIdAndUpdate(id, dto)
	}

	async get(id: string) {
		return await this.pageProductsModel.findById(id)
	}

	async find() {
		
}
