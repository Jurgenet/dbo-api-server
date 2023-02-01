import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const port = process.env.PORT || '3001'

async function bootstrap () {
 	const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

 	await app.listen(port)
  console.log(`Server run on port ${port}`)
}

bootstrap()
