import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface OrderModel extends Base {}
export class OrderModel extends TimeStamps {

  @prop()
  date: Date

  @prop()
  title: string

  @prop()
  price: number

  @prop()
  amount: number

  @prop()
  vendor: string

  @prop()
  seller: string

  @prop()
  link: string

  @prop({ type: () => [String] })
  markers: string[]
}
