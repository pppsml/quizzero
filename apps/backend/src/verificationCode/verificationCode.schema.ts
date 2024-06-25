import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IVerificationCode, VerificationCodeTypes } from '@repo/types'

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

  @Prop({ type: () => String, enum: VerificationCodeTypes })
  type: VerificationCodeTypes;

  createdAt: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode)