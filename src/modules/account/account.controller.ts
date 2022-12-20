import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindAccountDto } from './dto/find-account.dto'
import { AccountModel } from './account.model'

@Controller('account')
export class AccountController {

  @Post('create')
  async create (@Body() dto: Omit<AccountModel, '_id'>) {
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
  async patch (@Param('id') _id: string, @Body() dto: AccountModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindAccountDto) {
    //
  }
}
