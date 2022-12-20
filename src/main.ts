import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config()

const PORT = process.env.PORT || '3334'

async function bootstrap () {
 	const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

 	await app.listen(PORT)
  console.log(`Server run on port ${PORT}`)
}

bootstrap()
