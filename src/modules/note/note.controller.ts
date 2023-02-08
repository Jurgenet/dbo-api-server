import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from 'src/app.constants'
import { IdValidationPipe } from '../../pipes/ad-validation.pipe'
import { CreateNoteDto } from './dto/create-note.dto'
import { FindNoteByMarkersDto } from './dto/find-by-markers.dto'
import { NOTE_NOT_FOUND } from './note.constants'
import { NoteModel } from './note.model'
import { NoteService } from './note.service'

@Controller('note')
export class NoteController {

  constructor (
    private readonly noteService: NoteService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateNoteDto) {
    const doc = await this.noteService.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.noteService.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
  }

  @Get(':id')
  async getOne (@Param('id', IdValidationPipe) id: string) {
    const doc = await this.noteService.getOne(id)
    
    return { message: FETCHED_SUCCESSFULLY, result: doc[0] }
  }

  @Delete(':id')
  async delete (@Param('id', IdValidationPipe) id: string) {
    const deletedItem = await this.noteService.delete(id)

    if (!deletedItem) {
      throw new HttpException(NOTE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id', IdValidationPipe) id: string, @Body() dto: NoteModel) {
    const updatedDoc = await this.noteService.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(NOTE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }

  @Post('findByMarkers')
  @HttpCode(200)
  async findByMarkers (@Body() dto: FindNoteByMarkersDto) {
    const foundDocs = await this.noteService.findByMarkers(dto)

    return {
      message: FETCHED_SUCCESSFULLY,
      result: foundDocs,
    }
  }

  @Get('findByText/:text')
  async findByText (@Param('text') text: string) {
    const foundDocs = await this.noteService.findByText(text)

    return {
      message: FETCHED_SUCCESSFULLY,
      result: foundDocs,
    }
  }
}
