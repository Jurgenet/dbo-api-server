import { IsArray, IsNumber, IsString, Min } from 'class-validator'

export class CreateOrderDto {

  @IsString()
  date: string

  @IsString()
  title: string

  @IsNumber()
  price: number

  @IsNumber()
  @Min(1)
  amount: number

  @IsString()
  vendor: string

  @IsString()
  seller: string

  @IsString()
  link: string

  @IsArray()
  markers: string[]

  @IsString()
  text: string
}
