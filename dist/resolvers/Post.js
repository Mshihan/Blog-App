"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const userLoader_1 = require("./Loaders/userLoader");
exports.Post = {
    user: (parent, __, { prisma, userInfo }) => {
        // return prisma.user.findUnique({
        //   where: { id: parent.authorId },
        // });
        return userLoader_1.userLoader.load(parent.authorId);
    },
};
