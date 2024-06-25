import { FC, PropsWithChildren } from "react";

export const withProviders = (...providers: FC<PropsWithChildren>[]) => (WrappedComponent: FC) => (props: {}) => {
  return providers.reduceRight((acc, Provider) => (
    <Provider>{acc}</Provider>
  ), <WrappedComponent {...props} />)
}

export { ApolloProvider } from './Apollo'
export { MantineProvider } from './Mantine'
export { AuthProvider } from './Auth'