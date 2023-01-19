import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageProductsController } from './page-products.controller';
import { PageProductsModel } from './page-products.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: PageProductsModel,
      schemaOptions: {
        collection: 'PageProducts'
      }
    }])
  ],
  controllers: [PageProductsController]
})
export class PageProductsModule {}
