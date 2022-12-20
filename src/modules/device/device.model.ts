import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface DeviceModel extends Base {}
export class DeviceModel extends TimeStamps {

  @prop()
  image: string

  @prop()
  title: string

  @prop()
  model: string

  @prop()
  vendor: string

  @prop()
  location: string

  @prop()
  order: string

  @prop()
  text: string

  @prop({ type: () => [String] })
  markers: string[]

  @prop({ type: () => [String] })
  spares: string[]

  @prop()
  isZipped: boolean

  @prop()
  isBroken: boolean
}
