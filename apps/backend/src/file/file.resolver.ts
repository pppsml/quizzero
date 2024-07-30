import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";

import { FileService } from "./file.service";
import { File } from "./file.schema";

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => Boolean)
  async createFile(
    @Args({
      name: 'file',
      type: () => GraphQLUpload,
    }) file: FileUpload,
  ) {
    return !!await this.fileService.createOne(file, '/');
    // console.log(file);
    // return true;
  }
}