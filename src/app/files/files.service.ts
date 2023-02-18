import { Injectable } from '@nestjs/common'
import { v4 as uuid } from 'uuid'
import { writeFile } from 'fs-extra'
import * as sharp from 'sharp'
import { FileElementResponseDto } from './dto/file-element.response.dto'
import { MFile } from './mfile.class'
import { getUploadsFolder } from './files.utils'

@Injectable()
export class FilesService {

  async saveFile (file: MFile): Promise<FileElementResponseDto> {
    const newUniqName = `${uuid()}--${file.originalname}`

    await writeFile(`${getUploadsFolder()}/${newUniqName}`, file.buffer)

    return { url: newUniqName, name: file.originalname }
  }

  convertToWebp (file: Buffer): Promise<Buffer> {
    return sharp(file)
      .webp()
      .toBuffer()
  }
}
