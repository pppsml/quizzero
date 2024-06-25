export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser {
  _id: string;
  email: string;
  password: string | null;
  name: string;
  image: string | null;
  roles: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
