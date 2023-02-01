import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CreateKnowledgeDto } from './dto/create-knowledge.dto'
import { KNOWLEDGE_NOT_FOUND } from './knowledge.constants'
import { KnowledgeModel } from './knowledge.model'
import { KnowledgeService } from './knowledge.service'

@Controller('knowledge')
export class KnowledgeController {

  constructor (
    private readonly knowledgeService: KnowledgeService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create (@Body() dto: CreateKnowledgeDto) {
    return this.knowledgeService.create(dto)
  }

  @Get()
  async getAll () {
    return this.knowledgeService.getAll()
  }

  @Get(':id')
  async getOne (@Param('id') id: string) {
    return this.knowledgeService.getOne(id)
  }

  @Delete(':id')
  async delete (@Param('id') id: string) {
    const deletedItem = await this.knowledgeService.delete(id)

    if (!deletedItem) {
      throw new HttpException(KNOWLEDGE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch (@Param('id') _id: string, @Body() dto: KnowledgeModel) {
    //
  }
}
