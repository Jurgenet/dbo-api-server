import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { KnowledgeModel } from './knowledge.model'
import { CreateKnowledgeDto } from './dto/create-knowledge.dto'

@Injectable()
export class KnowledgeService {

  constructor(
    @InjectModel(KnowledgeModel) private readonly knowledgeModel: ModelType<KnowledgeModel>,
  ) {}

  async create (dto: CreateKnowledgeDto): Promise<DocumentType<KnowledgeModel>> {
    return this.knowledgeModel.create(dto)
  }

  async getAll (): Promise<KnowledgeModel[]> {
    return this.knowledgeModel
    .find({})
    .sort({ isActive: -1, rating: -1, date: -1, })
    .exec()
  }

  async getOne (id: string): Promise<KnowledgeModel[]> {
    return this.knowledgeModel.find({ _id: id }).exec()
  }

  async updateOne (id: string, dto: KnowledgeModel): Promise<KnowledgeModel | null> {
    return this.knowledgeModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async delete (id: string): Promise<DocumentType<KnowledgeModel> | null> {
    return this.knowledgeModel.findByIdAndDelete(id).exec()
  }
}