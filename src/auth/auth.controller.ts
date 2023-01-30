import {
	Body, 
	Controller, 
	HttpCode, 
	HttpException, 
	HttpStatus, 
	Post, 
	UsePipes, 
	ValidationPipe 
} from '@nestjs/common';
import { ALREADY_REGISTEERED_ERROR } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldRegister = await this.authService.find(dto.login);
		if (oldRegister) {
			throw new HttpException(ALREADY_REGISTEERED_ERROR, HttpStatus.BAD_REQUEST);
		}
		return await this.authService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const {email} = await this.authService.validationAuth(dto.login, dto.password);
		return await this.authService.login(email);
	};
};
