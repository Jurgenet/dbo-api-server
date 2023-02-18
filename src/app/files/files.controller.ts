import { Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PicturesService } from 'src/modules/pictures/pictures.service'
import { FileElementResponseDto } from './dto/file-element.response.dto'
import { FileUploadBodyDto } from './dto/file-upload-body.dto'
import { FilesService } from './files.service'

@Controller('files')
export class FilesController {

  constructor (
    private readonly service: FilesService,
    private readonly pictureService: PicturesService,
  ) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile (@UploadedFile() file: Express.Multer.File, @Body() body: FileUploadBodyDto): Promise<FileElementResponseDto> {

    const doc = await this.service.saveFile(file)

    await this.pictureService.create({
      group: body.group,
      size: file.size,
      title: doc.name,
      url: doc.url,
    })

    return doc
  }
}
