import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
	constructor(@Inject(ProductModel) private readonly productModel: ModelType<ProductModel>) {}
}
