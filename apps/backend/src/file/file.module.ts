import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { File, FileSchema } from './file.schema';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [
    FileService,
    FileResolver,
  ],
  exports: [
    FileService,
  ],
})
export class FileModule {}