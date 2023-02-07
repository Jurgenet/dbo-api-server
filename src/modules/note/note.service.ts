import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { NoteModel } from './note.model'
import { CreateNoteDto } from './dto/create-note.dto'
import { FindNoteDto } from './dto/find-note.dto'
import { PipelineStage } from 'mongoose'

@Injectable()
export class NoteService {

  constructor(
    @InjectModel(NoteModel) private readonly noteModel: ModelType<NoteModel>,
  ) {}

  async create (dto: CreateNoteDto): Promise<DocumentType<NoteModel>> {
    return this.noteModel.create(dto)
  }

  async getAll (): Promise<NoteModel[]> {
    return this.noteModel
      .find({})
      .sort({ isPinned: -1 })
      .exec()
  }

  async getOne (id: string): Promise<NoteModel[]> {
    return this.noteModel.find({ _id: id }).exec()
  }

  async updateOne (id: string, dto: NoteModel): Promise<NoteModel | null> {
    return this.noteModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async delete (id: string): Promise<DocumentType<NoteModel> | null> {
    return this.noteModel.findByIdAndDelete(id).exec()
  }

  async find (dto: FindNoteDto): Promise<NoteModel[]> {
    const pipes: PipelineStage[] = []

    pipes.push({ $match: { markers: { $all: dto.markers } } })
    pipes.push({ $sort: { _id: 1 } })
    if (dto.limit) pipes.push({ $limit: dto.limit })

    return this.noteModel.aggregate(pipes)
  }

  async findByText (text: string) {
    return this.noteModel.find({ $text: { $search: text, $caseSensitive: false } }).exec()
  }
}
