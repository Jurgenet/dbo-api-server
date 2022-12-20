import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { KnowledgeController } from './knowledge.controller'
import { KnowledgeModel } from './knowledge.model'

@Module({
  controllers: [KnowledgeController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: KnowledgeModel,
      schemaOptions: {
        collection: 'knowledges',
      },
    }])
  ],
})
export class KnowledgeModule {}
