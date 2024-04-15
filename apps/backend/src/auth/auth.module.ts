import { Module } from "@nestjs/common";

import { AuthResolver } from "./auth.resolver";
import { AuthController } from "./auth.controller";

import { ConfigServiceVariables } from "src/config";
import { SessionModule } from "src/session/session.module";
import { UserModule } from "src/user/user.module";
import { MailerModule } from "src/mailer/mailer.module";

import { ProvidersModule } from "./providers/providers.module";
import { GoogleProvider } from './providers/services/googleProvider'
import { ConfigService } from "@nestjs/config";


@Module({
  imports: [
    UserModule,
    MailerModule,
    SessionModule,
    ProvidersModule.registerAsync({
      useFactory(configService: ConfigService<ConfigServiceVariables>) {
        return {
          baseUri: 'http://localhost:5000',
          services: [
            new GoogleProvider({
              client_id: configService.get('GOOGLE_CLIENT_ID'),
              client_secret: configService.get('GOOGLE_CLIENT_SECRET'),
              scopes: ["profile", "email"],
            })
          ]
        }
      },
      inject: [
        ConfigService<ConfigServiceVariables>,
      ]
    }),
  ],
  controllers: [AuthController],
  providers: [AuthResolver],
})
export class AuthModule {}