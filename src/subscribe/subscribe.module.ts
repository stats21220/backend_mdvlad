import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SubscribeController } from './subscribe.controller';
import { SubscribeModel } from './subscribe.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: SubscribeModel,
      schemaOptions: {
        collection: 'Subscribe'
      }
    }])
  ],
  controllers: [SubscribeController]
})
export class SubscribeModule {}
