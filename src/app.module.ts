import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { PageProductsModule } from './page-products/page-products.module';
import { ProductModule } from './product/product.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [AuthModule, UserModule, OrderModule, SubscribeModule, PageProductsModule, ProductModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
