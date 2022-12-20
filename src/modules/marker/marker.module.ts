import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { MarkerController } from './marker.controller'
import { MarkerModel } from './marker.model'

@Module({
  controllers: [MarkerController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: MarkerModel,
      schemaOptions: {
        collection: '_markers',
      },
    }])
  ],
})
export class MarkerModule {}
