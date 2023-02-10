import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileElementResponseDto } from './dto/file-element.response.dto'
import { FilesService } from './files.service'
import { MFile } from './mfile.class'

@Controller('files')
export class FilesController {

  constructor (
    private readonly fileService: FilesService
  ) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile (@UploadedFile() file: Express.Multer.File): Promise<FileElementResponseDto[]> {
    const fileList: MFile[] = [new MFile(file)]

    if (file.mimetype.includes('image')) {
      const buffer = await this.fileService.convertToWebp(file.buffer)
      fileList.push(new MFile({
        originalname: `${file.originalname.split('.')[0]}.webp`,
        buffer,
      }))
    }

    return this.fileService.saveFiles(fileList)
  }
}
