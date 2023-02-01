import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { NoteModel } from './note.model'
import { CreateNoteDto } from './dto/create-note.dto'
import { Types } from 'mongoose'

@Injectable()
export class NoteService {

  constructor(
    @InjectModel(NoteModel) private readonly noteModel: ModelType<NoteModel>,
  ) {}

  async create (dto: CreateNoteDto): Promise<DocumentType<NoteModel>> {
    return this.noteModel.create(dto)
  }

  async getAll (): Promise<NoteModel[]> {
    return this.noteModel.find({}).exec()
  }

  async getOne (id: string): Promise<NoteModel[]> {
    return this.noteModel.find({ _id: id }).exec()
  }

  async delete (id: string): Promise<DocumentType<NoteModel> | null> {
    return this.noteModel.findByIdAndDelete(id).exec()
  }

  async finByMarkerId (markerId: string): Promise<NoteModel[]> {
    return this.noteModel.find({ markerId: new Types.ObjectId(markerId) }).exec()
  }
}
