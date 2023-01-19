import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { FeedbackController } from './feedback.controller';
import { FeedbackModel } from './feedback.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: FeedbackModel,
      schemaOptions: {
        collection: 'Feedback'
      }
    }])
  ],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
