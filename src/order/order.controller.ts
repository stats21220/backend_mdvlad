import { 
	Body, 
	Controller, 
	Delete, 
	Get, 
	HttpException, 
	HttpStatus, 
	Param, 
	Patch, 
	Post, 
	UseGuards 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateOrderDto } from './dto/create.order.dto';
import { OrderSaleDto } from './dto/order.sale.dto';
import { ORDER_NOT_FOUND } from './order.constants';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateOrderDto) {
		return await this.orderService.create(dto)
	}

	@Post('sale')
	async sale(@Body() dto: CreateOrderDto) {
		return await this.orderService.sale(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deleteOrder = await this.orderService.delete(id)
		if (!deleteOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return deleteOrder
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateOrderDto) {
		const updateOrder = await this.orderService.patch(id, dto)
		if (!updateOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return updateOrder
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		const getOrder = await this.orderService.get(id)
		if (!getOrder) {
			throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
		}
		return getOrder
	}

	// async find() { ///// подумать над реализацией

	// }
}
