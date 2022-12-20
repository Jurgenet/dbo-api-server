import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AccountController } from './account.controller'
import { AccountModel } from './account.model'

@Module({
  controllers: [AccountController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: AccountModel,
      schemaOptions: {
        collection: 'accounts',
      },
    }])
  ],
})
export class AccountModule {

}
