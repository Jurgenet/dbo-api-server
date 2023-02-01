import { IsString } from 'class-validator'

export class CreateMarkerDto {

  @IsString()
  _id: string

  @IsString()
  ancestor: string

  @IsString({ message: 'Значение группы должно быть строкой' })
  group: string

  @IsString()
  textColor: string

  @IsString()
  bgColor: string
}
