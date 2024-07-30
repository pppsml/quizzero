import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Request, Response } from "express";

import { IContext } from "src/types";

export const getGraphqlConfig = (): ApolloDriverConfig => ({
  path: '/api/graphql',
  driver: ApolloDriver,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  buildSchemaOptions: {
    dateScalarMode: 'timestamp',
  },
  autoSchemaFile: true,
  context: async ({ req, res }: { req: Request; res: Response }) =>
    ({
      req,
      res,
      user: req.session.user || null,
    }) as IContext,
})