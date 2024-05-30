import { FC, PropsWithChildren } from 'react'
import { ApolloProvider as LibApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import { BACKEND_URI_GRAPHQL } from '../../config/env'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: BACKEND_URI_GRAPHQL,
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'true',
      'Apollo-Require-Preflight': 'true',
    },
  })
})

export const ApolloProvider: FC = ({ children }: PropsWithChildren) => {
  return (
    <LibApolloProvider client={client}>
      {children}
    </LibApolloProvider>
  )
}