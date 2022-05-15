"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    me: (_, __, { prisma, userInfo }) => {
        if (!userInfo)
            return null;
        return prisma.user.findUnique({
            where: { id: userInfo.userId },
        });
    },
    posts: (_, __, { prisma }) => {
        return prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
    },
};
