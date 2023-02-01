import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { AccountController } from './account.controller'
import { AccountModel } from './account.model'
import { AccountService } from './account.service'

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
  providers: [AccountService],
})
export class AccountModule {

}
