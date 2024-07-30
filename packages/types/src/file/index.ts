export interface IFile {
  _id: string;
  name: string;
  mimeType: string;
  extension: string;
  encoding: string;
  uri: string;
  createdAt: Date;
  updatedAt: Date;
}