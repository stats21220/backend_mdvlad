import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { SubscribeController } from './subscribe.controller';
import { SubscribeModel } from './subscribe.model';
import { SubscribeService } from './subscribe.service';

@Module({
  imports: [
	TypegooseModule.forFeature([{
		typegooseClass: SubscribeModel,
		schemaOptions: {
		collection: 'Subscribe'
		}
	}])
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService]
})
export class SubscribeModule {}
