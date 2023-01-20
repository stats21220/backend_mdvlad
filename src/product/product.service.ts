import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

	async create(dto: CreateProductDto) {
		return await this.productModel.create(dto)
	}

	async delete(id: string) {
		return await this.productModel.findByIdAndDelete(id).exec()
	}

	async patch(id: string, dto: CreateProductDto) {
		return await this.productModel.findByIdAndUpdate(id, dto).exec()
	}

	async get(id: string) {
		return await this.productModel.findById(id).exec()
	}

	// async find() {
		
	// }
}
