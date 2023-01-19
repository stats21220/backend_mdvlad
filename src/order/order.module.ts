import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedbackModel } from 'src/feedback/feedback.model';
import { OrderController } from './order.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: FeedbackModel,
      schemaOptions: {
        collection: 'Feedback'
      }
    }])
  ],
  controllers: [OrderController]
})
export class OrderModule {}
