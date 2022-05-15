"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUserMutation = void 0;
const canUserMutation = async ({ userId, postId, prisma, }) => {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user)
        return {
            userErrors: [{ message: "User not found. Please try to login again" }],
            post: null,
        };
    const post = await prisma.post.findUnique({ where: { id: Number(postId) } });
    if ((post === null || post === void 0 ? void 0 : post.authorId) !== user.id)
        return {
            userErrors: [{ message: "This post dosen't belong to the user" }],
            post: null,
        };
};
exports.canUserMutation = canUserMutation;
