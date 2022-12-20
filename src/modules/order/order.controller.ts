import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindOrderDto } from './dto/find-order.dto'
import { OrderModel } from './order.model'

@Controller('order')
export class OrderController {

  @Post('create')
  async create (@Body() dto: Omit<OrderModel, '_id'>) {
    //
  }

  @Get(':id')
  async get (@Param('id') _id: string) {
    //
  }

  @Delete(':id')
  async delete (@Param('id') _id: string) {
    //
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: OrderModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindOrderDto) {
    //
  }

  @Get('byDevice/:deviceId')
  async getByDevice (@Param('deviceId') deviceId: string) {
    //
  }
}
