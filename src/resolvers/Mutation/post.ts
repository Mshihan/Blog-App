import { Post, prisma, Prisma } from "@prisma/client";
import { Context } from "../../index";

interface PostCreateArgs {
  post: {
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
    { prisma }: Context
  ): Promise<PostPayloadType> => {
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
  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostCreateArgs["post"] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;

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
    { prisma }: Context
  ) => {
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
