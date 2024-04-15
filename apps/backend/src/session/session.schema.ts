import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ISession } from '@repo/types'

@Schema()
export class Session implements ISession {
  _id: string;

  @Prop({ type: () => String, required: true, unique: true })
  sid: string;
  
  @Prop({ type: () => String, required: true })
  userId: string;
  
  @Prop({ type: () => String })
  data: string;

  @Prop({ type: () => Date })
  expiresAt: Date | null;
}

export const SessionSchema = SchemaFactory.createForClass(Session)