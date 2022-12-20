import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { DeviceModel } from './device.model'
import { FindDeviceDto } from './dto/find-device.dto'

@Controller('device')
export class DeviceController {

  @Post('create')
  async create (@Body() dto: Omit<DeviceModel, '_id'>) {
    //
  }

  @Get(':id')
  async get (@Param('id') _id: string) {
    //
  }

  @Delete(':id')
  async delete (@Param('id') _id: string) {
    //
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: DeviceModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindDeviceDto) {
    //
  }
}
