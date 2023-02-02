import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from 'src/app.constants'
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
    const doc = this.orderService.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.orderService.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
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
  async patch (@Param('id') id: string, @Body() dto: OrderModel) {
    const updatedDoc = await this.orderService.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(ORDER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }
}
