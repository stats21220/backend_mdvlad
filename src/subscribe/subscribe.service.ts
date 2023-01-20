import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { SubscribeModel } from './subscribe.model';

@Injectable()
export class SubscribeService {
	constructor(@Inject(SubscribeModel) private readonly subscribeModel: ModelType<SubscribeModel>) {}
}
