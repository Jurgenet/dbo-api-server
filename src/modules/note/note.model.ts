import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export class NoteLink {
  @prop()
  label: string

  @prop()
  reference: string
}

export interface NoteModel extends Base {}
export class NoteModel extends TimeStamps {

  @prop()
  title: string

  @prop()
  text: string

  @prop({ type: () => [NoteLink], _id: false })
  links: NoteLink[]

  @prop({ type: () => [String] })
  markers: string[]

  @prop()
  isPinned: boolean

  @prop()
  createdAt: Date

  @prop()
  updatedAt: Date
}
