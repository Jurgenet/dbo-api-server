import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindProductDto } from './dto/find-marker.dto'
import { MarkerModel } from './marker.model'

@Controller('marker')
export class MarkerController {

  @Post('create')
  async create (@Body() dto: Omit<MarkerModel, '_id'>) {
    //
  }

  @Get(':id')
  async get (@Param('id') _id: string) {
    //
  }

  @Delete(':id')
  async delete (@Param('id') _id: string) {
    //
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: MarkerModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindProductDto) {
    //
  }
}
