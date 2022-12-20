import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { NoteController } from './note.controller'
import { NoteModel } from './note.model'

@Module({
  controllers: [NoteController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: NoteModel,
      schemaOptions: {
        collection: 'notes',
      },
    }])
  ],
})
export class NoteModule {}
