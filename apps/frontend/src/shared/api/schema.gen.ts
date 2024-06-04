import * as Types from './models.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
undefined
const defaultOptions = {} as const;
export type GetAuthUriQueryVariables = Types.Exact<{
  provider: Types.Scalars['String']['input'];
}>;


export type GetAuthUriQuery = { getAuthUri: string };


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