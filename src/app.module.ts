import { PicturesModule } from './modules/pictures/pictures.module';
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getMongoConfig } from './app/configs/mongo.config'
import { SystemModule } from './app/system/system.module'
import { AuthModule } from './app/auth/auth.module'
import { FilesModule } from './app/files/files.module'
import { TelegramModule } from './app/telegram/telegram.module'
import { getTelegramConfig } from './app/configs/telegram.config'
import { MarkerModule } from './modules/marker/marker.module'
import { AccountModule } from './modules/account/account.module'
import { NoteModule } from './modules/note/note.module'
import { OrderModule } from './modules/order/order.module'
import { KnowledgeModule } from './modules/knowledge/knowledge.module'
import { DeviceModule } from './modules/device/device.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
    SystemModule,
    AuthModule,
    FilesModule,
    PicturesModule,
    MarkerModule,
    AccountModule,
    NoteModule,
    OrderModule,
    KnowledgeModule,
    DeviceModule,
  ],
  controllers: [AppController], // unusual
  providers: [AppService], // unusual
})
export class AppModule { }
