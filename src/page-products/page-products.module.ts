import { Module } from '@nestjs/common';
import { PageProductsController } from './page-products.controller';

@Module({
  controllers: [PageProductsController]
})
export class PageProductsModule {}
