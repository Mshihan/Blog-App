import { Context } from "../index";

interface ParentInputArgs {
  userId: number;
  bio: string;
  id: number;
}

export const Profile = {
  user: (parent: ParentInputArgs, __: any, { prisma, userInfo }: Context) => {
    return prisma.user.findUnique({
      where: { id: parent.userId },
    });
  },
};
