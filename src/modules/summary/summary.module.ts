import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { SummaryController } from './summary.controller'
import { SummaryModel } from './summary.model'

@Module({
  controllers: [SummaryController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: SummaryModel,
      schemaOptions: {
        collection: 'summary',
      },
    }])
  ],
})
export class SummaryModule {}
