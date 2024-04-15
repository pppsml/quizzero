export type BaseProviderOptsType = {
  name: string;
  authorize_uri: string;
  access_uri: string;
  profile_uri: string;
  scopes: string[];
  client_id: string;
  client_secret: string;
};