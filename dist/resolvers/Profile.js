"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
exports.Profile = {
    user: (parent, __, { prisma, userInfo }) => {
        return prisma.user.findUnique({
            where: { id: parent.userId },
        });
    },
};
