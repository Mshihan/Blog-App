"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.User = {
    posts: (parent, __, { prisma, userInfo }) => {
        if (userInfo === null || userInfo.userId !== parent.id) {
            return prisma.post.findMany({
                where: { authorId: parent.id, published: true },
                orderBy: { createdAt: "desc" },
            });
        }
        return prisma.post.findMany({
            where: { authorId: parent.id },
            orderBy: { createdAt: "desc" },
        });
    },
};
