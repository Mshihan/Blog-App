"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    posts: (_, __, { prisma }) => {
        return prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
};
