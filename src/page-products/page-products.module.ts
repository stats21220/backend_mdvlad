import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { PageProductsController } from './page-products.controller';
import { PageProductsModel } from './page-products.model';
import { PageProductsService } from './page-products.service';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: PageProductsModel,
      schemaOptions: {
        collection: 'PageProducts'
      }
    }])
  ],
  controllers: [PageProductsController],
  providers: [PageProductsService]
})
export class PageProductsModule {}
