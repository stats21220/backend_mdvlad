import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

	constructor(private readonly userService: UserService) {}

	@Post('create')
	async create(@Body() dto: CreateUserDto) {
		return await this.userService.create(dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return await this.userService.delete(id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateUserDto) {
		return await this.userService.patch(id, dto)
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		return await this.userService.get(id)
	}

	@Post()
	async find(@Body() dto: FindUserDto) {
		return await this.userService.find(dto)
	}
}
