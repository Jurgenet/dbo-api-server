import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
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
})
export class OrderModule {}
