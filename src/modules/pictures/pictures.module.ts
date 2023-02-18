import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { PicturesModel } from './pictures.model'
import { PicturesController } from './pictures.controller'
import { PicturesService } from './pictures.service'

@Module({
  controllers: [PicturesController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: PicturesModel,
      schemaOptions: {
        collection: 'pictures',
      },
    }])
  ],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
