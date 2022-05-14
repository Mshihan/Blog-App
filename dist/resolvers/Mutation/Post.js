"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
exports.post = {
    postCreate: async (__, { post }, { prisma }) => {
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
                    authorId: 1,
                },
            }),
        };
    },
    postUpdate: async (_, { post, postId }, { prisma }) => {
        const { title, content } = post;
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
    postDelete: async (_, { postId }, { prisma }) => {
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
};
