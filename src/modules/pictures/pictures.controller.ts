import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from 'src/app.constants'
import { CreatePictureDto } from './dto/create-picture.dto'
import { PICTURE_NOT_FOUND } from './pictures.constants'
import { PicturesModel } from './pictures.model'
import { PicturesService } from './pictures.service'

@Controller('pictures')
export class PicturesController {

  constructor (
    private readonly service: PicturesService
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async create (@Body() dto: CreatePictureDto) {
    const doc = await this.service.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.service.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.service.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.service.delete(id)

    if (!deletedItem) {
      throw new HttpException(PICTURE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') id: string, @Body() dto: PicturesModel) {
    const updatedDoc = await this.service.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(PICTURE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }
}
