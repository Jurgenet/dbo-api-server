import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface PicturesModel extends Base {}
export class PicturesModel extends TimeStamps {

  @prop()
  title: string

  @prop()
  url: string

  @prop()
  size: string

  @prop({ type: () => [String] })
  markers: string[]

  @prop()
  group?: string

  @prop()
  description?: string
}
