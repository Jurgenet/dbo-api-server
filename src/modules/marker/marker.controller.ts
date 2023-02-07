import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from '../../app.constants'
import { CreateMarkerDto } from './dto/create-marker.dto'
import { FindMarkerDto } from './dto/find-marker.dto'
import { MARKER_NOT_FOUND } from './marker.constants'
import { MarkerModel } from './marker.model'
import { MarkerService } from './marker.service'

@Controller('marker')
export class MarkerController {

  constructor (
    private readonly markerService: MarkerService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateMarkerDto) {
    const doc = await this.markerService.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.markerService.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.markerService.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.markerService.delete(id)

    if (!deletedItem) {
      throw new HttpException(MARKER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') id: string, @Body() dto: MarkerModel) {
    const updatedDoc = await this.markerService.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(MARKER_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }

  @Post('find')
  @HttpCode(200)
  async find (@Body() dto: FindMarkerDto) {
    return this.markerService.find(dto)
  }
}
