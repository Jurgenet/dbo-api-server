import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { OrderModel } from './order.model'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
  ) {}

  async create (dto: CreateOrderDto): Promise<DocumentType<OrderModel>> {
    return this.orderModel.create(dto)
  }

  async getAll (): Promise<OrderModel[]> {
    return this.orderModel.find({}).exec()
  }

  async getOne (id: string): Promise<OrderModel[]> {
    return this.orderModel.find({ _id: id }).exec()
  }

  async delete (id: string): Promise<DocumentType<OrderModel> | null> {
    return this.orderModel.findByIdAndDelete(id).exec()
  }
}
