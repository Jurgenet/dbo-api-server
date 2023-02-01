import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsString } from 'class-validator'
import { NoteLink } from '../note.model'

export class CreateNoteDto {

  @IsString()
  title: string

  @IsString()
  text: string

  @IsArray()
  @Type(() => NoteLink)
  links: NoteLink[]

  @IsArray()
  markers: string[]

  @IsBoolean()
  isPinned: boolean
}
