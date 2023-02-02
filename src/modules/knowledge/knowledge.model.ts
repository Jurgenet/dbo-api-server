import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface KnowledgeModel extends Base {}
export class KnowledgeModel extends TimeStamps {

  @prop()
  type: string

  @prop()
  group: string

  @prop()
  date: string

  @prop()
  title: string

  @prop()
  platform: string

  @prop()
  author: string

  @prop()
  lang: string

  @prop()
  cover: string

  @prop()
  location: string

  @prop()
  link: string

  @prop()
  text: string

  @prop()
  isActive: boolean

  @prop()
  isOnline: boolean

  @prop()
  isDone: boolean

  @prop({ type: () => [String] })
  markers: string[]

  @prop()
  rating?: number
}
