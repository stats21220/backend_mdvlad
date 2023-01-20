import { Inject, Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
	constructor(@Inject(AuthModel) private readonly authModel: ModelType<AuthModel>) {}
}
