import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  const mongoUrl = process.env.DOCKERIZED ? configService.get('MONGODB_CONNECTION') : configService.get('MONGODB_E2E_TESTS_CONNECTION')
  return {
    uri: mongoUrl ?? '',
    useNewUrlParser: true,
    // useCreateIndex: true, // MongoParseError: option usecreateindex is not supported
    useUnifiedTopology: true,
  }
}
