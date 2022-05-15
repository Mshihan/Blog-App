import { Context } from "../../index";

interface canUserMutateParams {
  userId: number;
  postId: string;
  prisma: Context["prisma"];
}

export const canUserMutation = async ({
  userId,
  postId,
  prisma,
}: canUserMutateParams) => {
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

  if (!user)
    return {
      userErrors: [{ message: "User not found. Please try to login again" }],
      post: null,
    };
  const post = await prisma.post.findUnique({ where: { id: Number(postId) } });

  if (post?.authorId !== user.id)
    return {
      userErrors: [{ message: "This post dosen't belong to the user" }],
      post: null,
    };
};
