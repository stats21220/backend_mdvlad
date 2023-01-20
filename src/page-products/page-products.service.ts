import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { PageProductsModel } from './page-products.model';

@Injectable()
export class PageProductsService {
	constructor(@Inject(PageProductsModel) private readonly pageProductsModel: ModelType<PageProductsModel>) {}
}
