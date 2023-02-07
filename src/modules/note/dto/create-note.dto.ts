import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator'
import { NoteLink } from '../note.model'

export class CreateNoteDto {

  @IsString()
  title: string

  @IsString()
  text: string

  @IsArray()
  @ValidateNested()
  @Type(() => NoteLink)
  links: NoteLink[]

  @IsArray()
  @IsString({ each: true })
  markers: string[]

  @IsBoolean()
  isPinned: boolean
}
