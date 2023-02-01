import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ACCOUNT_NOT_FOUND } from './account.constants'
import { AccountModel } from './account.model'
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create-account.dto'

@Controller('account')
export class AccountController {

  constructor (
    private readonly accountService: AccountService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateAccountDto) {
    return this.accountService.create(dto)
  }

  @Get()
  async getAll () {
    return this.accountService.getAll()
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.accountService.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.accountService.delete(id)

    if (!deletedItem) {
      throw new HttpException(ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: AccountModel) {
    //
  }
}
