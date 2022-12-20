import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { DeviceController } from './device.controller'
import { DeviceModel } from './device.model'

@Module({
  controllers: [DeviceController],
  imports: [
    TypegooseModule.forFeature([{
      typegooseClass: DeviceModel,
      schemaOptions: {
        collection: 'devices',
      },
    }])
  ],
})
export class DeviceModule {}
