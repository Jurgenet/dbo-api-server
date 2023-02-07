import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { MarkerModel } from './marker.model'
import { CreateMarkerDto } from './dto/create-marker.dto'
import { FindMarkerDto } from './dto/find-marker.dto'
import { PipelineStage } from 'mongoose'

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
    return this.markerModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async delete (id: string): Promise<DocumentType<MarkerModel> | null> {
    return this.markerModel.findByIdAndDelete(id).exec()
  }

  async find (dto: FindMarkerDto): Promise<MarkerModel[]> {
    const pipes: PipelineStage[] = []

    if (dto._id) pipes.push({ $match: { _id: dto._id } })
    if (dto.ancestor) pipes.push({ $match: { ancestor: dto.ancestor } })
    pipes.push({ $sort: { _id: 1 } })
    if (dto.limit) pipes.push({ $limit: dto.limit })
    pipes.push({ $lookup: { from: 'notes', localField: '_id', foreignField: 'markers', as: 'references' } })
    pipes.push({ $addFields: { referenceCount: { $size: '$references' } } })

    return this.markerModel.aggregate(pipes)
  }
}
