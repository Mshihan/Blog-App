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
    profile: async (_, { userId }, { prisma, userInfo }) => {
        const isMyProfile = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId) === Number(userId);
        if (!userId)
            return null;
        const profile = await prisma.profile.findUnique({
            where: { userId: Number(userId) },
        });
        if (!profile)
            return null;
        console.log(isMyProfile);
        return {
            ...profile,
            isMyProfile,
        };
    },
};
