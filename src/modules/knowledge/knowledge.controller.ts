import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindKnowledgeDto } from './dto/find-knowledge'
import { KnowledgeModel } from './knowledge.model'

@Controller('knowledge')
export class KnowledgeController {

  @Post('create')
  async create (@Body() dto: Omit<KnowledgeModel, '_id'>) {
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
  async patch (@Param('id') _id: string, @Body() dto: KnowledgeModel) {
    //
  }

  @HttpCode(200)
  @Post()
  async find (@Body() dto: FindKnowledgeDto) {
    //
  }
}
