import { Base } from '@typegoose/typegoose/lib/defaultClasses'
import { prop } from '@typegoose/typegoose/lib/prop'

export interface NoteModel extends Base {}
export class SummaryModel {

  @prop()
  avatar: string

  @prop()
  firstName: string

  @prop()
  lastName: string

  @prop()
  position: string

  @prop()
  location: string

  @prop()
  workFormat: string

  @prop()
  formOfEmployment: string

  @prop()
  sallary: number

  @prop({ type: () => [String] })
  contacts: string[]

  @prop()
  startOfExperience: Date

  @prop({ type: () => [String] })
  workExperience: string[]

  @prop({ type: () => [String] })
  languages: string[]

  @prop({ type: () => [String] })
  hardSkills: string[]

  @prop({ type: () => [String] })
  softSkills: string[]

  @prop()
  education: string

  @prop({ type: () => [String] })
  sertifications: string[]

  @prop({ type: () => [String] })
  resumeLinks: string[]

  @prop({ type: () => [String] })
  hubs: string[]

  @prop()
  profile: string
}
