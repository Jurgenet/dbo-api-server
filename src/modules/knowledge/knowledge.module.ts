import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { KnowledgeController } from './knowledge.controller'
import { KnowledgeModel } from './knowledge.model'
import { KnowledgeService } from './knowledge.service'

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
  providers: [KnowledgeService],
})
export class KnowledgeModule {}
