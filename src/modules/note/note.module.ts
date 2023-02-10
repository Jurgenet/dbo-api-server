import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TelegramModule } from 'src/app/telegram/telegram.module'
import { NoteController } from './note.controller'
import { NoteModel } from './note.model'
import { NoteService } from './note.service'

@Module({
  controllers: [NoteController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: NoteModel,
      schemaOptions: {
        collection: 'notes',
      },
    }]),
    TelegramModule,
  ],
  providers: [NoteService],
})
export class NoteModule {}
