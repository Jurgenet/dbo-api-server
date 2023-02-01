import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { OrderService } from '../order/order.service'
import { OrderController } from './order.controller'
import { OrderModel } from './order.model'

@Module({
  controllers: [OrderController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: OrderModel,
      schemaOptions: {
        collection: 'orders',
      },
    }])
  ],
  providers: [OrderService],
})
export class OrderModule {}
