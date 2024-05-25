export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  image: string;
  roles: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
