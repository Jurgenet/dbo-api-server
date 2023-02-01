import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateNoteDto } from './dto/create-note.dto'
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
    return this.noteService.create(dto)
  }

  @Get()
  async getAll () {
    return this.noteService.getAll()
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.noteService.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.noteService.delete(id)

    if (!deletedItem) {
      throw new HttpException(NOTE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: NoteModel) {
    //
  }

  @Get('byMarkerId/:markerId')
  async findByMarkerId (@Param('markerId') markerId: string) {
    return this.noteService.finByMarkerId(markerId)
  }
}
