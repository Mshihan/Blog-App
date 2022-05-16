import { Context } from "../index";

interface UserParentType {
  id: number;
}

export const User = {
  posts: (parent: UserParentType, __: any, { prisma, userInfo }: Context) => {
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
