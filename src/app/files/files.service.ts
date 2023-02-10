import { Injectable } from '@nestjs/common'
import { format } from 'date-fns'
import { ensureDir, writeFile } from 'fs-extra'
import * as sharp from 'sharp'
import { FileElementResponseDto } from './dto/file-element.response.dto'
import { MFile } from './mfile.class'
import { getUploadsFolder } from './files.utils'

@Injectable()
export class FilesService {

  async saveFiles (files: MFile[]): Promise<FileElementResponseDto[]> {
    const response: FileElementResponseDto[] = []
    const dateFolder = format(new Date(), 'yyyy-MM-dd')
    const uploadFolder = `${getUploadsFolder()}/${dateFolder}`

    await ensureDir(uploadFolder)

    for(const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      response.push({ url: `${dateFolder}/${file.originalname}`, name: file.originalname })
    }

    return response
  }

  convertToWebp (file: Buffer): Promise<Buffer> {
    return sharp(file)
      .webp()
      .toBuffer()
  }
}
