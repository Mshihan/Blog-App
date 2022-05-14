import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import { DocumentNode } from "graphql";
import { typeDefs } from "./schema";
import { Query, Mutation } from "./resolvers";

import { Prisma, PrismaClient } from "@prisma/client";

export interface Context {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
}

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
  const prisma = new PrismaClient();

  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: {
      prisma,
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve: any) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const resolver = {
  Query,
  Mutation,
};
startApolloServer(typeDefs, resolver);
