import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {

  @prop()
  category: string

  @prop()
  title: string

  @prop()
  email: string

  @prop()
  login: string

  @prop()
  password: string

  @prop()
  link: string

  @prop()
  location: string

  @prop()
  text: string

  @prop({ type: () => [String] })
  markers: string[]
}
