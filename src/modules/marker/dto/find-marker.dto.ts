import { IsString, IsNumber } from 'class-validator'

export class FindMarkerDto {

  @IsString()
  _id: string

  @IsString()
  ancestor: string

  @IsNumber()
  limit: number
}
