import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export enum KnowledgeCategory {
  Course = 'Course',
  Book = 'Book',
  Video = 'Video',
  Post = 'Post',
  Service = 'Service',
  Other = 'Other',
}

export interface KnowledgeModel extends Base {}
export class KnowledgeModel extends TimeStamps {

  @prop({ enum: KnowledgeCategory, type: () => String })
  category: KnowledgeCategory

  @prop()
  yearOfIssue: number

  @prop()
  title: string

  @prop()
  lang: string

  @prop()
  publisher: string

  @prop()
  author: string

  @prop()
  cover: string

  @prop()
  link: string

  @prop()
  location: string

  @prop({ type: () => [String] })
  markers: string[]

  @prop()
  isActive: boolean

  @prop()
  isDone: boolean

  @prop()
  isLicensed: boolean
}
