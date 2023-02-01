import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {

  @prop()
  title: string

  @prop()
  group: string

  @prop()
  email: string

  @prop()
  login: string

  @prop()
  password: string

  @prop()
  link: string

  @prop({ type: () => [String] })
  markers: string[]

  @prop()
  text: string
}
