import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatePageProductsDto } from './dto/create.page-products.dto';
import { PageProductsModel } from './page-products.model';

@Injectable()
export class PageProductsService {
	constructor(@Inject(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
	
	async create(dto: CreatePageProductsDto) {
		return await this.pageProductsModel.create(dto)
	}

	async delete(id: string) {
		return await this.pageProductsModel.findByIdAndDelete(id).exec()
	}

	async patch(id: string, dto: CreatePageProductsDto) {
		return await this.pageProductsModel.findByIdAndUpdate(id, dto).exec()
	}

	async get(id: string) {
		return await this.pageProductsModel.findById(id).exec()
	}

	async find() {
		
	}
}

