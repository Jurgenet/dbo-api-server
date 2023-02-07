import { IsArray, IsString } from 'class-validator'

export class CreateAccountDto {

  @IsString()
  title: string

  @IsString()
  group: string

  @IsString()
  email: string

  @IsString()
  login: string

  @IsString()
  password: string

  @IsString()
  link: string

  @IsArray()
  @IsString({ each: true })
  markers: string[]

  @IsString()
  text: string
}
