import { ConfigService } from "@nestjs/config";
import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";

import { ConfigServiceVariables } from "./configService.config";

export const getMongooseConfig = (): MongooseModuleAsyncOptions => ({
  useFactory: async (configService: ConfigService<ConfigServiceVariables>) => {
    return {
      uri: configService.get('MONGODB_URI')
    }
  },
  inject: [ConfigService],
})