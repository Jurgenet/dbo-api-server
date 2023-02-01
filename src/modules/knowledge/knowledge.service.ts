import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { KnowledgeModel } from './knowledge.model'
import { CreateKnowledgeDto } from './dto/create-knowledge.dto'
import { Types } from 'mongoose'

@Injectable()
export class KnowledgeService {

  constructor(
    @InjectModel(KnowledgeModel) private readonly knowledgeModel: ModelType<KnowledgeModel>,
  ) {}

  async create (dto: CreateKnowledgeDto): Promise<DocumentType<KnowledgeModel>> {
    return this.knowledgeModel.create(dto)
  }

  async getAll (): Promise<KnowledgeModel[]> {
    return this.knowledgeModel.find({}).exec()
  }

  async getOne (id: string): Promise<KnowledgeModel[]> {
    return this.knowledgeModel.find({ _id: id }).exec()
  }

  async delete (id: string): Promise<DocumentType<KnowledgeModel> | null> {
    return this.knowledgeModel.findByIdAndDelete(id).exec()
  }

  async finByMarkerId (markerId: string): Promise<KnowledgeModel[]> {
    return this.knowledgeModel.find({ markerId: new Types.ObjectId(markerId) }).exec()
  }
}