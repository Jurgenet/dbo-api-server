import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: configService.get('MONGODB_URI_SERVER') ?? '',
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  }
}
