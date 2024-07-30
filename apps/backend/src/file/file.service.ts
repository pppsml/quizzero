import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUpload } from 'graphql-upload-ts';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { IFile } from '@repo/types';

import { File } from './file.schema';
import { ConfigServiceVariables } from 'src/config';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
    private readonly configService: ConfigService<ConfigServiceVariables>,
  ) {}

  private getFileUri(file: FileUpload, path: string): string {
    const baseUri = this.configService.get('BACKEND_URI');
    return `${baseUri}/api/files/${path}/${file.filename}`;
  }

  private getFileNameAndExtension(file: FileUpload): {
    name: string;
    extension: string;
  } {
    const regex = new RegExp(/(.*)\.(.*)/);
    const [_, _name, extension] = regex.exec(file.filename);

    const name = nanoid()

    return {
      name,
      extension,
    };
  }

  private createDir(path: string): boolean {
    const dirPath = join(__dirname, '../../files', path);

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
      return true;
    } else {
      return false;
    }
  }

  private writeFile(file: FileUpload, path: string): Promise<boolean> {
    this.createDir(path);

    return new Promise((resolve, reject) => 
      file.createReadStream()
        .pipe(createWriteStream(join(__dirname, '../../files', path, file.filename)))
        .on('finish', () => resolve(true))
        .on('error', err => reject(err))
    )
  }

  async createOne(
    file: FileUpload,
    path: string,
  ): Promise<File> {
    const { name, extension } = this.getFileNameAndExtension(file);
    file.filename = `${name}.${extension}`;
    const fileUri = this.getFileUri(file, path);

    this.writeFile(file, path)

    const fileData: Omit<IFile, '_id' | 'createdAt' | 'updatedAt'> = {
      name: `${name}.${extension}`,
      mimeType: file.mimetype,
      encoding: file.encoding,
      extension,
      uri: fileUri,
    };

    return this.fileModel.create(fileData);
  }
}
