'use client'
import { PropsWithChildren } from 'react';
import { ApolloProvider } from './Apollo';
import { UserProvider } from './User';

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ApolloProvider>
  );
}

export { ApolloProvider } from './Apollo'
// export { MantineProvider } from './Mantine'
export { UserProvider } from './User'