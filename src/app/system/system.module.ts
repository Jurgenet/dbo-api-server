import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SystemController } from './system.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [SystemController],
})
export class SystemModule {}
