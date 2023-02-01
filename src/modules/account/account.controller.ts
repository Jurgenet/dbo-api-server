import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from '../../app.constants'
import { CreateAccountDto } from './dto/create-account.dto'
import { ACCOUNT_NOT_FOUND } from './account.constants'
import { AccountModel } from './account.model'
import { AccountService } from './account.service'

@Controller('account')
export class AccountController {

  constructor (
    private readonly accountService: AccountService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateAccountDto) {
    const doc = await this.accountService.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.accountService.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
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
  async patch (@Param('id') id: string, @Body() dto: AccountModel) {
    const updatedDoc = await this.accountService.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }
}
