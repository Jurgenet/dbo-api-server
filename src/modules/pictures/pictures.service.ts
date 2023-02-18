import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { PicturesModel } from './pictures.model'
import { CreatePictureDto } from './dto/create-picture.dto'

@Injectable()
export class PicturesService {

  constructor(
    @InjectModel(PicturesModel) private readonly model: ModelType<PicturesModel>,
  ) {}

  async create (dto: CreatePictureDto): Promise<DocumentType<PicturesModel>> {
    return this.model.create(dto)
  }

  async getAll (): Promise<PicturesModel[]> {
    return this.model
    .find({})
    .sort({ updatedAt: -1 })
    .exec()
  }

  async getOne (id: string): Promise<PicturesModel[]> {
    return this.model.find({ _id: id }).exec()
  }

  async updateOne (id: string, dto: PicturesModel): Promise<PicturesModel | null> {
    return this.model.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async delete (id: string): Promise<DocumentType<PicturesModel> | null> {
    return this.model.findByIdAndDelete(id).exec()
  }
}
