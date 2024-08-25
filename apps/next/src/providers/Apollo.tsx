'use client'
import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloClient, ApolloNextAppProvider, InMemoryCache, SSRMultipartLink } from "@apollo/experimental-nextjs-app-support";

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI_GRAPHQL,
    credentials: "include",
    headers: {
      "Apollo-Require-Preflight": "true",
      cookie: typeof document !== "undefined" ? document?.cookie : "",
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}