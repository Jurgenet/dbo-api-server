import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller('system')
export class SystemController {

  constructor (
    private readonly configService: ConfigService
  ) {}

  @Get('ping')
  async ping () {
    //
  }

  @Get('backup')
  async backup () {
    console.log(this.configService.get('MONGODB_BACKUP_FOLDER'))
  }
}
