import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find.user.dto';
import { USER_NOT_FOUND } from './user.constants';
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
		const deleteUser = await this.userService.delete(id)
		if (!deleteUser) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteUser
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateUserDto) {
		const updateUser = await this.userService.patch(id, dto)
		if (!updateUser) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateUser
	}

	@Get(':id')
	async getId(@Param('id') id: string) {
		const getUserId = await this.userService.get(id)
		if (!getUserId) {
			throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getUserId
	}

	@Post()
	async find(@Body() dto: FindUserDto) {
		return await this.userService.find(dto)
	}
}
