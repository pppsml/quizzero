export interface IAccount {
  _id: string;
  userId: string;
  type: string;
  access_token: string;
  refresh_token: string;
  provider: AllowedProviders;
  providerAccountId: string;
  expires_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum AllowedProviders {
  GOOGLE = 'google',
}