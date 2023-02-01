import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { MarkerController } from './marker.controller'
import { MarkerModel } from './marker.model'
import { MarkerService } from './marker.service'

@Module({
  controllers: [MarkerController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: MarkerModel,
      schemaOptions: {
        collection: 'markers',
      },
    }]),
  ],
  providers: [MarkerService],
})
export class MarkerModule {}
