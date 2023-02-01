import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types'
import { AccountModel } from './account.model'
import { CreateAccountDto } from './dto/create-account.dto'

@Injectable()
export class AccountService {

  constructor(
    @InjectModel(AccountModel) private readonly accountModel: ModelType<AccountModel>,
  ) {}

  async create (dto: CreateAccountDto): Promise<DocumentType<AccountModel>> {
    return this.accountModel.create(dto)
  }

  async getAll (): Promise<AccountModel[]> {
    return this.accountModel.find({}).exec()
  }

  async getOne (id: string): Promise<AccountModel[]> {
    return this.accountModel.find({ _id: id }).exec()
  }

  async updateOne (id: string, dto: AccountModel): Promise<AccountModel | null> {
    return this.accountModel.findByIdAndUpdate(id, dto).exec()
  }

  async delete (id: string): Promise<DocumentType<AccountModel> | null> {
    return this.accountModel.findByIdAndDelete(id).exec()
  }
}
