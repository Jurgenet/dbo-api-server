import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { MarkerModel } from './marker.model'
import { CreateMarkerDto } from './dto/create-marker.dto'

@Injectable()
export class MarkerService {

  constructor(
    @InjectModel(MarkerModel) private readonly markerModel: ModelType<MarkerModel>,
  ) {}

  async create (dto: CreateMarkerDto): Promise<DocumentType<MarkerModel>> {
    return this.markerModel.create(dto)
  }

  async getAll (): Promise<MarkerModel[]> {
    return this.markerModel.find({}).exec()
  }

  async getOne (id: string): Promise<MarkerModel[]> {
    return this.markerModel.find({ _id: id }).exec()
  }

  async updateOne (id: string, dto: MarkerModel): Promise<MarkerModel | null> {
    return this.markerModel.findByIdAndUpdate(id, dto).exec()
  }

  async delete (id: string): Promise<DocumentType<MarkerModel> | null> {
    return this.markerModel.findByIdAndDelete(id).exec()
  }
}
