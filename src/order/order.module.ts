import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedbackModel } from 'src/feedback/feedback.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: FeedbackModel,
      schemaOptions: {
        collection: 'Feedback'
      }
    }])
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
