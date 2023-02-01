import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateKnowledgeDto {

  @IsString()
  type: string

  @IsString()
  date: string

  @IsString()
  title: string

  @IsString()
  platform: string

  @IsString()
  author: string

  @IsString()
  lang: string

  @IsString()
  cover: string

  @IsString()
  location: string

  @IsString()
  link: string

  @IsString()
  text: string

  @IsBoolean()
  isActive: boolean

  @IsBoolean()
  isOnline: boolean

  @IsBoolean()
  isDone: boolean

  @IsArray()
  @IsString({ each: true })
  markers: string[]

  @IsOptional()
  @IsNumber()
  @Min(1,)
  @Max(5)
  rating?: number
}