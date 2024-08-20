'use client'
import { MantineProvider } from '@mantine/core';

import { PropsWithChildren } from 'react';
import { ApolloProvider } from './Apollo';
import { UserProvider } from './User';

export const AllProviders = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider>
      <UserProvider>
        <MantineProvider>
          {children}
        </MantineProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export { ApolloProvider } from './Apollo'
// export { MantineProvider } from './Mantine'
export { UserProvider } from './User'