import { Post, prisma, Prisma } from "@prisma/client";
import { userInfo } from "os";
import { Context } from "../../index";
import { canUserMutation } from "../Utils/canUserMutation";

interface PostCreateArgs {
  post: {
    id: string;
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const post = {
  postCreate: async (
    __: any,
    { post }: PostCreateArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
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
  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostCreateArgs["post"] },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

    const error = await canUserMutation({
      userId: userInfo.userId,
      postId: post.id,
      prisma,
    });

    if (error) return error;

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) delete payloadToUpdate.title;
    if (!content) delete payloadToUpdate.content;

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
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ) => {
    if (!userInfo?.userId) {
      return {
        userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
        post: null,
      };
    }

    const error = await canUserMutation({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (error) return error;

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
  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ) => {
    if (!userInfo?.userId) {
      return {
        userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
        post: null,
      };
    }

    const error = await canUserMutation({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (error) return error;

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
  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ) => {
    if (!userInfo?.userId) {
      return {
        userErrors: [{ message: "Forbidden access (unauthenticated user)" }],
        post: null,
      };
    }

    const error = await canUserMutation({
      userId: userInfo.userId,
      postId: postId,
      prisma,
    });

    if (error) return error;

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
