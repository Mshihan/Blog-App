"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const schema_1 = require("./schema");
const resolvers_1 = require("./resolvers");
const client_1 = require("@prisma/client");
const getUserFromToken_1 = require("./resolvers/utils/getUserFromToken");
async function startApolloServer(typeDefs, resolvers) {
    const prisma = new client_1.PrismaClient();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        context: async ({ req }) => {
            const userInfo = await (0, getUserFromToken_1.getUserFromToken)(req.headers.authorization);
            return { prisma, userInfo };
        },
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
const resolver = {
    Query: resolvers_1.Query,
    Mutation: resolvers_1.Mutation,
    Profile: resolvers_1.Profile,
};
startApolloServer(schema_1.typeDefs, resolver);
