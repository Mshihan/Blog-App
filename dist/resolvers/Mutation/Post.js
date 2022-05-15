"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const canUserMutation_1 = require("../utils/canUserMutation");
exports.post = {
    postCreate: async (__, { post }, { prisma, userInfo }) => {
        if (!userInfo)
            return {
                userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
                post: null,
            };
        const { title, content } = post;
        if (!title || !content)
            return {
                userErrors: [{ message: "title and content are required" }],
                post: null,
            };
        return {
            userErrors: [],
            post: prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: userInfo.userId,
                },
            }),
        };
    },
    postUpdate: async (_, { post, postId }, { prisma, userInfo }) => {
        const { title, content } = post;
        const error = await (0, canUserMutation_1.canUserMutation)({
            userId: userInfo.userId,
            postId: post.id,
            prisma,
        });
        if (error)
            return error;
        let payloadToUpdate = {
            title,
            content,
        };
        if (!title)
            delete payloadToUpdate.title;
        if (!content)
            delete payloadToUpdate.content;
        if (!title || !content)
            return {
                userErrors: [{ message: "title and content are required" }],
                post: null,
            };
        const existingPost = await prisma.post.findUnique({
            where: { id: Number(postId) },
        });
        if (!existingPost)
            return {
                userErrors: [{ message: "Post dose not exists" }],
                post: null,
            };
        return {
            userErrors: [],
            post: prisma.post.update({
                data: { ...payloadToUpdate },
                where: { id: Number(postId) },
            }),
        };
    },
    postDelete: async (_, { postId }, { prisma, userInfo }) => {
        if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId)) {
            return {
                userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
                post: null,
            };
        }
        const error = await (0, canUserMutation_1.canUserMutation)({
            userId: userInfo.userId,
            postId: postId,
            prisma,
        });
        if (error)
            return error;
        const existingPost = await prisma.post.findUnique({
            where: { id: Number(postId) },
        });
        if (!existingPost) {
            return {
                userErrors: [{ message: "Post dose not exists" }],
                post: null,
            };
        }
        return {
            userErrors: [],
            post: prisma.post.delete({ where: { id: Number(postId) } }),
        };
    },
    postPublish: async (_, { postId }, { prisma, userInfo }) => {
        if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId)) {
            return {
                userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
                post: null,
            };
        }
        const error = await (0, canUserMutation_1.canUserMutation)({
            userId: userInfo.userId,
            postId: postId,
            prisma,
        });
        if (error)
            return error;
        const existingPost = await prisma.post.findUnique({
            where: { id: Number(postId) },
        });
        if (!existingPost) {
            return {
                userErrors: [{ message: "Post dose not exists" }],
                post: null,
            };
        }
        return {
            userErrors: [],
            post: prisma.post.update({
                data: { published: true },
                where: { id: Number(postId) },
            }),
        };
    },
    postUnpublish: async (_, { postId }, { prisma, userInfo }) => {
        if (!(userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId)) {
            return {
                userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
                post: null,
            };
        }
        const error = await (0, canUserMutation_1.canUserMutation)({
            userId: userInfo.userId,
            postId: postId,
            prisma,
        });
        if (error)
            return error;
        const existingPost = await prisma.post.findUnique({
            where: { id: Number(postId) },
        });
        if (!existingPost) {
            return {
                userErrors: [{ message: "Post dose not exists" }],
                post: null,
            };
        }
        return {
            userErrors: [],
            post: prisma.post.update({
                data: { published: false },
                where: { id: Number(postId) },
            }),
        };
    },
};
