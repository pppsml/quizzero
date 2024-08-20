import { headers } from "next/headers";
import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, registerApolloClient } from "@apollo/experimental-nextjs-app-support";

export const makeClient = () => {
  const headersInstance = headers();

  const httpLink = new HttpLink({
    headers: {
      cookie: headersInstance.get("cookie") ?? "",
    },
    uri: "http://localhost:5000/api/graphql",
    credentials: "include",
  })

  return new ApolloClient({

    cache: new InMemoryCache(),
    link: httpLink,
    credentials: "include",
  });
}

export const { PreloadQuery, getClient, query } = registerApolloClient(makeClient);