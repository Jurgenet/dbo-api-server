import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { ORDER_NOT_FOUND } from './order.constants'
import { OrderModel } from './order.model'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {

  constructor (
    private readonly orderService: OrderService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto)
  }

  @Get()
  async getAll () {
    return this.orderService.getAll()
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.orderService.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.orderService.delete(id)

    if (!deletedItem) {
      throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: OrderModel) {
    //
  }
}
