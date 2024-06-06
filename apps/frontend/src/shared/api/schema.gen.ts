import * as Types from './models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMeQuery = { getMe?: { _id: any, email: string, name: string } | null };

export type GetAuthUriQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
}>;


export type GetAuthUriQuery = { getAuthUri: string };

export type ProviderCallbackQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
  code: Types.Scalars['String']['input'];
}>;


export type ProviderCallbackQuery = { providerCallback?: { _id: any, email: string, name: string } | null };


export const GetMeDocument = gql`
    query GetMe {
  getMe {
    _id
    email
    name
  }
}
    `;

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