export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  GraphQLObjectId: { input: any; output: any; }
  Timestamp: { input: any; output: any; }
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Mutation = {
  createUser: User;
  login?: Maybe<User>;
  logout: Scalars['Boolean']['output'];
  registration: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegistrationArgs = {
  createUserInput: CreateUserInput;
};

export type Query = {
  getAuthUri: Scalars['String']['output'];
  getMe?: Maybe<User>;
  getUserById?: Maybe<User>;
  providerCallback?: Maybe<User>;
};


export type QueryGetAuthUriArgs = {
  provider: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProviderCallbackArgs = {
  code: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};

export type User = {
  _id: Scalars['GraphQLObjectId']['output'];
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
  updatedAt: Scalars['Timestamp']['output'];
};
