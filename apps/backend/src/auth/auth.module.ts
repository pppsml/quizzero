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
import { AuthService } from "./auth.service";
import { AccountModule } from "src/account/account.module";


@Module({
  imports: [
    UserModule,
    MailerModule,
    SessionModule,
    AccountModule,
    ProvidersModule.registerAsync({
      useFactory(configService: ConfigService<ConfigServiceVariables>) {
        return {
          baseUri: configService.get('OAUTH_REDIRECT_URI'),
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
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}