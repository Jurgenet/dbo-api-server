import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePictureDto {

  @IsString()
  title: string

  @IsString()
  group: string

  @IsString()
  url: string

  @IsNumber()
  size: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  markers?: string[]

  @IsOptional()
  @IsString()
  description?: string
}
