import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';
import { UserModel } from './user.model';

@Controller('user')
export class UserController {

	@Post('create')
	async create(@Body() dto: CreateUserDto) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateUserDto) {

	}

	@Get(':id')
	async getId(@Param('id') id: string) {

	}

	@Post()
	async find(@Body() dto: FindUserDto) {

	}
}
