import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { hashSync } from "bcrypt";

import { User, UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from "./user.service";

import { MailerModule } from "src/mailer/mailer.module";
// import { VerificationCodeModule } from "src/verificationCode/verificationCode.module";
// import { UserActiveSessionModule } from "src/userActiveSession/userActiveSession.module";


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema
          schema.pre('save', function() {
            if (!this.isModified('password')) return;

            const saltRounds = 10
            const hash = hashSync(this.password, saltRounds)

            this.password = hash
          })

          return schema;
        },
      },
    ]),
    MailerModule,
    // VerificationCodeModule,
    // UserActiveSessionModule,
  ],
  providers: [
    UserResolver,
    UserService,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}