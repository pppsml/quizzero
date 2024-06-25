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

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe: Scalars['Boolean']['input'];
};

export type Mutation = {
  login: User;
  logout: Scalars['Boolean']['output'];
  registerUser: User;
  verifyCode: Scalars['Boolean']['output'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationVerifyCodeArgs = {
  verifyCodeInput: VerifyCodeInput;
};

export type Query = {
  getAuthUri: Scalars['String']['output'];
  getEmailConfirmationMail: Scalars['Boolean']['output'];
  getMe?: Maybe<User>;
  getUserById?: Maybe<User>;
  providerCallback?: Maybe<User>;
  userWithEmailExists: Scalars['Boolean']['output'];
};


export type QueryGetAuthUriArgs = {
  provider: Scalars['String']['input'];
};


export type QueryGetEmailConfirmationMailArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProviderCallbackArgs = {
  code: Scalars['String']['input'];
  provider: Scalars['String']['input'];
};


export type QueryUserWithEmailExistsArgs = {
  email: Scalars['String']['input'];
};

export type User = {
  _id: Scalars['GraphQLObjectId']['output'];
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  roles: Array<Scalars['String']['output']>;
};

export enum VerificationCodeType {
  Email = 'EMAIL',
  PasswordReset = 'PASSWORD_RESET'
}

export type VerifyCodeInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  type: VerificationCodeType;
};
