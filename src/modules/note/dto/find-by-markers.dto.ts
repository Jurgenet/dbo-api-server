import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class FindNoteByMarkersDto {

  @IsArray()
  @IsString({ each: true })
  markers: string[]

  @IsOptional()
  @IsNumber()
  limit?: number
}
