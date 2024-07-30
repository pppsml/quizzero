import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IFile } from "@repo/types";

@Schema({ timestamps: true })
export class File implements IFile {
  _id: string;

  @Prop({ type: () => String })
  name: string;

  @Prop({ type: () => String })
  mimeType: string;

  @Prop({ type: () => String })
  encoding: string;

  @Prop({ type: () => String })
  extension: string;

  @Prop({ type: () => String })
  uri: string;

  createdAt: Date;
  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);