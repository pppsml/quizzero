import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IVerificationCode } from '@repo/types'


@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  }
})
export class VerificationCode implements IVerificationCode {
  _id: string

  @Prop({ type: () => String })
  code: string;

  @Prop({ type: () => String })
  email: string;

  createdAt: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode)