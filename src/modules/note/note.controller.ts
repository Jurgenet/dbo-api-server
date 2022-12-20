import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindNoteDto } from './dto/find-note.dto'
import { NoteModel } from './note.model'

@Controller('note')
export class NoteController {

  @Post('create')
  async create (@Body() dto: Omit<NoteModel, '_id'>) {
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
  async patch (@Param('id') _id: string, @Body() dto: NoteModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindNoteDto) {
    //
  }
}
