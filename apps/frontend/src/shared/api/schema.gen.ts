import * as Types from './models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserDataFragment = { _id: any, name: string, email: string };

export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { _id: any, name: string, email: string } | null };

export type GetAuthUriQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
}>;


export type GetAuthUriQuery = { getAuthUri: string };

export type ProviderCallbackQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type ProviderCallbackQuery = { providerCallback?: { _id: any, email: string, name: string } | null };

export type UserWithEmailIsExistsQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type UserWithEmailIsExistsQuery = { userWithEmailIsExists: boolean };

export type GetEmailConfirmationEmailQueryVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
}>;


export type GetEmailConfirmationEmailQuery = { getEmailConfirmationEmail: string };

export type GetUserByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetUserByIdQuery = { getUserById?: { _id: any, name: string, email: string } | null };

export type RegisterUserMutationVariables = Types.Exact<{
  createUserInput: Types.CreateUserInput;
}>;


export type RegisterUserMutation = { registerUser: { _id: any, name: string, email: string } };

export type LoginMutationVariables = Types.Exact<{
  loginInput: Types.LoginInput;
}>;


export type LoginMutation = { login: { _id: any, name: string, email: string } };

export const UserDataFragmentDoc = gql`
    fragment UserData on User {
  _id
  name
  email
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
    _id
    email
    name
  }
}
    `;

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
export const UserWithEmailIsExistsDocument = gql`
    query UserWithEmailIsExists($email: String!) {
  userWithEmailIsExists(email: $email)
}
    `;

/**
 * __useUserWithEmailIsExistsQuery__
 *
 * To run a query within a React component, call `useUserWithEmailIsExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWithEmailIsExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWithEmailIsExistsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserWithEmailIsExistsQuery(baseOptions: Apollo.QueryHookOptions<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables> & ({ variables: UserWithEmailIsExistsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>(UserWithEmailIsExistsDocument, options);
      }
export function useUserWithEmailIsExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>(UserWithEmailIsExistsDocument, options);
        }
export function useUserWithEmailIsExistsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>(UserWithEmailIsExistsDocument, options);
        }
export type UserWithEmailIsExistsQueryHookResult = ReturnType<typeof useUserWithEmailIsExistsQuery>;
export type UserWithEmailIsExistsLazyQueryHookResult = ReturnType<typeof useUserWithEmailIsExistsLazyQuery>;
export type UserWithEmailIsExistsSuspenseQueryHookResult = ReturnType<typeof useUserWithEmailIsExistsSuspenseQuery>;
export type UserWithEmailIsExistsQueryResult = Apollo.QueryResult<UserWithEmailIsExistsQuery, UserWithEmailIsExistsQueryVariables>;
export const GetEmailConfirmationEmailDocument = gql`
    query GetEmailConfirmationEmail($email: String!) {
  getEmailConfirmationEmail(email: $email)
}
    `;

/**
 * __useGetEmailConfirmationEmailQuery__
 *
 * To run a query within a React component, call `useGetEmailConfirmationEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailConfirmationEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailConfirmationEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetEmailConfirmationEmailQuery(baseOptions: Apollo.QueryHookOptions<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables> & ({ variables: GetEmailConfirmationEmailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>(GetEmailConfirmationEmailDocument, options);
      }
export function useGetEmailConfirmationEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>(GetEmailConfirmationEmailDocument, options);
        }
export function useGetEmailConfirmationEmailSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>(GetEmailConfirmationEmailDocument, options);
        }
export type GetEmailConfirmationEmailQueryHookResult = ReturnType<typeof useGetEmailConfirmationEmailQuery>;
export type GetEmailConfirmationEmailLazyQueryHookResult = ReturnType<typeof useGetEmailConfirmationEmailLazyQuery>;
export type GetEmailConfirmationEmailSuspenseQueryHookResult = ReturnType<typeof useGetEmailConfirmationEmailSuspenseQuery>;
export type GetEmailConfirmationEmailQueryResult = Apollo.QueryResult<GetEmailConfirmationEmailQuery, GetEmailConfirmationEmailQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  getUserById(id: $id) {
    _id
    name
    email
  }
}
    `;

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
    mutation RegisterUser($createUserInput: CreateUserInput!) {
  registerUser(createUserInput: $createUserInput) {
    _id
    name
    email
  }
}
    `;
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
 *      createUserInput: // value for 'createUserInput'
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
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
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
 *      loginInput: // value for 'loginInput'
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