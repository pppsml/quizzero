import { FC, PropsWithChildren } from "react";

export const withProviders = (...providers: FC<PropsWithChildren>[]) => (WrappedComponent: FC) => (props: {}) => {
  return providers.reduceRight((acc, Provider) => (
    <Provider>{acc}</Provider>
  ), <WrappedComponent {...props} />)
}

export * from './Apollo'
export * from './Mantine'