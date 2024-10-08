import * as Types from './models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserDataFragment = { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any };

export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } | null };

export type GetAuthUriQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
}>;


export type GetAuthUriQuery = { getAuthUri: string };

export type ProviderCallbackQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type ProviderCallbackQuery = { providerCallback?: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } | null };

export type UserWithEmailExistsQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type UserWithEmailExistsQuery = { userWithEmailExists: boolean };

export type GetEmailConfirmationMailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type GetEmailConfirmationMailQuery = { getEmailConfirmationMail: boolean };

export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { getUserById?: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } | null };

export type RegisterUserMutationVariables = Types.Exact<{
  input: Types.CreateUserInput;
}>;


export type RegisterUserMutation = { registerUser: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } };

export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = { login: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } };

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type VerifyCodeMutationVariables = Types.Exact<{
  input: Types.VerifyCodeInput;
}>;


export type VerifyCodeMutation = { verifyCode: boolean };

export type CreateQuizMutationVariables = Types.Exact<{
  createQuizInput: Types.CreateQuizInput;
}>;


export type CreateQuizMutation = { createQuiz: { _id: any, title: string, createdAt: any, updatedAt: any, questions: Array<{ id: number, text: string, correct: number, answerOptions: Array<{ id: number, text: string }> }>, createdBy: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } } };

export type GetAllQuizzesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllQuizzesQuery = { getAllQuizzes: Array<{ _id: any, title: string, image?: string | null, createdAt: any, updatedAt: any, createdBy: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } }> };

export type GetQuizByIdQueryVariables = Types.Exact<{
  quizId: Types.Scalars['String']['input'];
}>;


export type GetQuizByIdQuery = { getQuizById: { _id: any, image?: string | null, title: string, createdAt: any, updatedAt: any, questions: Array<{ id: number, image?: string | null, text: string, answerOptions: Array<{ id: number, image?: string | null, text: string }> }>, createdBy: { _id: any, name: string, email: string, image?: string | null, roles: Array<string>, createdAt: any } } };

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  _id
  name
  email
  image
  roles
  createdAt
}
    `;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetAuthUriDocument = gql`
    query GetAuthUri($provider: String!) {
  getAuthUri(provider: $provider)
}
    `;

/**
 * __useGetAuthUriQuery__
 *
 * To run a query within a React component, call `useGetAuthUriQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthUriQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthUriQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useGetAuthUriQuery(baseOptions: Apollo.QueryHookOptions<GetAuthUriQuery, GetAuthUriQueryVariables> & ({ variables: GetAuthUriQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthUriQuery, GetAuthUriQueryVariables>(GetAuthUriDocument, options);
      }
export function useGetAuthUriLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthUriQuery, GetAuthUriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthUriQuery, GetAuthUriQueryVariables>(GetAuthUriDocument, options);
        }
export function useGetAuthUriSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAuthUriQuery, GetAuthUriQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthUriQuery, GetAuthUriQueryVariables>(GetAuthUriDocument, options);
        }
export type GetAuthUriQueryHookResult = ReturnType<typeof useGetAuthUriQuery>;
export type GetAuthUriLazyQueryHookResult = ReturnType<typeof useGetAuthUriLazyQuery>;
export type GetAuthUriSuspenseQueryHookResult = ReturnType<typeof useGetAuthUriSuspenseQuery>;
export type GetAuthUriQueryResult = Apollo.QueryResult<GetAuthUriQuery, GetAuthUriQueryVariables>;
export const ProviderCallbackDocument = gql`
    query ProviderCallback($provider: String!, $code: String!) {
  providerCallback(provider: $provider, code: $code) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useProviderCallbackQuery__
 *
 * To run a query within a React component, call `useProviderCallbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useProviderCallbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProviderCallbackQuery({
 *   variables: {
 *      provider: // value for 'provider'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useProviderCallbackQuery(baseOptions: Apollo.QueryHookOptions<ProviderCallbackQuery, ProviderCallbackQueryVariables> & ({ variables: ProviderCallbackQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProviderCallbackQuery, ProviderCallbackQueryVariables>(ProviderCallbackDocument, options);
      }
export function useProviderCallbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProviderCallbackQuery, ProviderCallbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProviderCallbackQuery, ProviderCallbackQueryVariables>(ProviderCallbackDocument, options);
        }
export function useProviderCallbackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProviderCallbackQuery, ProviderCallbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProviderCallbackQuery, ProviderCallbackQueryVariables>(ProviderCallbackDocument, options);
        }
export type ProviderCallbackQueryHookResult = ReturnType<typeof useProviderCallbackQuery>;
export type ProviderCallbackLazyQueryHookResult = ReturnType<typeof useProviderCallbackLazyQuery>;
export type ProviderCallbackSuspenseQueryHookResult = ReturnType<typeof useProviderCallbackSuspenseQuery>;
export type ProviderCallbackQueryResult = Apollo.QueryResult<ProviderCallbackQuery, ProviderCallbackQueryVariables>;
export const UserWithEmailExistsDocument = gql`
    query UserWithEmailExists($email: String!) {
  userWithEmailExists(email: $email)
}
    `;

/**
 * __useUserWithEmailExistsQuery__
 *
 * To run a query within a React component, call `useUserWithEmailExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWithEmailExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWithEmailExistsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserWithEmailExistsQuery(baseOptions: Apollo.QueryHookOptions<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables> & ({ variables: UserWithEmailExistsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>(UserWithEmailExistsDocument, options);
      }
export function useUserWithEmailExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>(UserWithEmailExistsDocument, options);
        }
export function useUserWithEmailExistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>(UserWithEmailExistsDocument, options);
        }
export type UserWithEmailExistsQueryHookResult = ReturnType<typeof useUserWithEmailExistsQuery>;
export type UserWithEmailExistsLazyQueryHookResult = ReturnType<typeof useUserWithEmailExistsLazyQuery>;
export type UserWithEmailExistsSuspenseQueryHookResult = ReturnType<typeof useUserWithEmailExistsSuspenseQuery>;
export type UserWithEmailExistsQueryResult = Apollo.QueryResult<UserWithEmailExistsQuery, UserWithEmailExistsQueryVariables>;
export const GetEmailConfirmationMailDocument = gql`
    query GetEmailConfirmationMail($email: String!) {
  getEmailConfirmationMail(email: $email)
}
    `;

/**
 * __useGetEmailConfirmationMailQuery__
 *
 * To run a query within a React component, call `useGetEmailConfirmationMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailConfirmationMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailConfirmationMailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetEmailConfirmationMailQuery(baseOptions: Apollo.QueryHookOptions<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables> & ({ variables: GetEmailConfirmationMailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>(GetEmailConfirmationMailDocument, options);
      }
export function useGetEmailConfirmationMailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>(GetEmailConfirmationMailDocument, options);
        }
export function useGetEmailConfirmationMailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>(GetEmailConfirmationMailDocument, options);
        }
export type GetEmailConfirmationMailQueryHookResult = ReturnType<typeof useGetEmailConfirmationMailQuery>;
export type GetEmailConfirmationMailLazyQueryHookResult = ReturnType<typeof useGetEmailConfirmationMailLazyQuery>;
export type GetEmailConfirmationMailSuspenseQueryHookResult = ReturnType<typeof useGetEmailConfirmationMailSuspenseQuery>;
export type GetEmailConfirmationMailQueryResult = Apollo.QueryResult<GetEmailConfirmationMailQuery, GetEmailConfirmationMailQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  getUserById(id: $id) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: CreateUserInput!) {
  registerUser(createUserInput: $input) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    ...UserData
  }
}
    ${UserDataFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const VerifyCodeDocument = gql`
    mutation VerifyCode($input: VerifyCodeInput!) {
  verifyCode(verifyCodeInput: $input)
}
    `;
export type VerifyCodeMutationFn = Apollo.MutationFunction<VerifyCodeMutation, VerifyCodeMutationVariables>;

/**
 * __useVerifyCodeMutation__
 *
 * To run a mutation, you first call `useVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCodeMutation, { data, loading, error }] = useVerifyCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyCodeMutation(baseOptions?: Apollo.MutationHookOptions<VerifyCodeMutation, VerifyCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyCodeMutation, VerifyCodeMutationVariables>(VerifyCodeDocument, options);
      }
export type VerifyCodeMutationHookResult = ReturnType<typeof useVerifyCodeMutation>;
export type VerifyCodeMutationResult = Apollo.MutationResult<VerifyCodeMutation>;
export type VerifyCodeMutationOptions = Apollo.BaseMutationOptions<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const CreateQuizDocument = gql`
    mutation CreateQuiz($createQuizInput: CreateQuizInput!) {
  createQuiz(createQuizInput: $createQuizInput) {
    _id
    title
    questions {
      id
      text
      answerOptions {
        id
        text
      }
      correct
    }
    createdBy {
      ...UserData
    }
    createdAt
    updatedAt
  }
}
    ${UserDataFragmentDoc}`;
export type CreateQuizMutationFn = Apollo.MutationFunction<CreateQuizMutation, CreateQuizMutationVariables>;

/**
 * __useCreateQuizMutation__
 *
 * To run a mutation, you first call `useCreateQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuizMutation, { data, loading, error }] = useCreateQuizMutation({
 *   variables: {
 *      createQuizInput: // value for 'createQuizInput'
 *   },
 * });
 */
export function useCreateQuizMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuizMutation, CreateQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuizMutation, CreateQuizMutationVariables>(CreateQuizDocument, options);
      }
export type CreateQuizMutationHookResult = ReturnType<typeof useCreateQuizMutation>;
export type CreateQuizMutationResult = Apollo.MutationResult<CreateQuizMutation>;
export type CreateQuizMutationOptions = Apollo.BaseMutationOptions<CreateQuizMutation, CreateQuizMutationVariables>;
export const GetAllQuizzesDocument = gql`
    query GetAllQuizzes {
  getAllQuizzes {
    _id
    title
    image
    createdBy {
      ...UserData
    }
    createdAt
    updatedAt
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useGetAllQuizzesQuery__
 *
 * To run a query within a React component, call `useGetAllQuizzesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllQuizzesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllQuizzesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllQuizzesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>(GetAllQuizzesDocument, options);
      }
export function useGetAllQuizzesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>(GetAllQuizzesDocument, options);
        }
export function useGetAllQuizzesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>(GetAllQuizzesDocument, options);
        }
export type GetAllQuizzesQueryHookResult = ReturnType<typeof useGetAllQuizzesQuery>;
export type GetAllQuizzesLazyQueryHookResult = ReturnType<typeof useGetAllQuizzesLazyQuery>;
export type GetAllQuizzesSuspenseQueryHookResult = ReturnType<typeof useGetAllQuizzesSuspenseQuery>;
export type GetAllQuizzesQueryResult = Apollo.QueryResult<GetAllQuizzesQuery, GetAllQuizzesQueryVariables>;
export const GetQuizByIdDocument = gql`
    query GetQuizById($quizId: String!) {
  getQuizById(quizId: $quizId) {
    _id
    image
    title
    questions {
      id
      image
      text
      answerOptions {
        id
        image
        text
      }
    }
    createdBy {
      ...UserData
    }
    createdAt
    updatedAt
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useGetQuizByIdQuery__
 *
 * To run a query within a React component, call `useGetQuizByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizByIdQuery({
 *   variables: {
 *      quizId: // value for 'quizId'
 *   },
 * });
 */
export function useGetQuizByIdQuery(baseOptions: Apollo.QueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables> & ({ variables: GetQuizByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
      }
export function useGetQuizByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
        }
export function useGetQuizByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetQuizByIdQuery, GetQuizByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetQuizByIdQuery, GetQuizByIdQueryVariables>(GetQuizByIdDocument, options);
        }
export type GetQuizByIdQueryHookResult = ReturnType<typeof useGetQuizByIdQuery>;
export type GetQuizByIdLazyQueryHookResult = ReturnType<typeof useGetQuizByIdLazyQuery>;
export type GetQuizByIdSuspenseQueryHookResult = ReturnType<typeof useGetQuizByIdSuspenseQuery>;
export type GetQuizByIdQueryResult = Apollo.QueryResult<GetQuizByIdQuery, GetQuizByIdQueryVariables>;