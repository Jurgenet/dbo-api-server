import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { CREATED_SUCCESSFULLY, FETCHED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from 'src/app.constants'
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
    const doc = await this.knowledgeService.create(dto)

    return {
      message: CREATED_SUCCESSFULLY,
      result: doc,
    }
  }

  @Get()
  async getAll () {
    const result = await this.knowledgeService.getAll()

    return { message: FETCHED_SUCCESSFULLY, count: result.length, result }
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
  async patch (@Param('id') id: string, @Body() dto: KnowledgeModel) {
    const updatedDoc = await this.knowledgeService.updateOne(id, dto)

    if (!updatedDoc) {
      throw new HttpException(KNOWLEDGE_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return {
      message: UPDATED_SUCCESSFULLY,
      result: updatedDoc,
    }
  }
}
