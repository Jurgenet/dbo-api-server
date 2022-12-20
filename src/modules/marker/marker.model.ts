import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface MarkerModel extends Base {}
export class MarkerModel extends TimeStamps {
  @prop()
  ancestor: string

  @prop()
  textColor: string

  @prop()
  bgColor: string
}
