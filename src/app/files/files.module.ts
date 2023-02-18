import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { PicturesModule } from 'src/modules/pictures/pictures.module'
import { UPLOAD_URL_ROOT_PREFIX } from './files.constants'
import { FilesController } from './files.controller'
import { FilesService } from './files.service'
import { getUploadsFolder } from './files.utils'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: getUploadsFolder(),
      serveRoot: UPLOAD_URL_ROOT_PREFIX,
    }),
    PicturesModule,
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
