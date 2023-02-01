import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

// TODO: remove groups, use default NA
export enum MarkerGroups {
  NA = 'na',
  Personal = 'personal',
  Dev = 'dev',
  ETC = 'etc',
}

export class MarkerModel extends TimeStamps {

  @prop()
  _id: string

  @prop()
  ancestor: string

  @prop({ enum: MarkerGroups, type: () => String })
  group: MarkerGroups

  @prop()
  textColor: string

  @prop()
  bgColor: string
}
