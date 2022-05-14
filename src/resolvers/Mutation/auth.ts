import { Context } from "../../index";
import validator from "validator";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../keys";

// import

interface UserInputType {
  user: {
    name: string;
    email: string;
    password: string;
    bio: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  user: User | null;
  token: string | null;
}

export const auth = {
  signUp: async (
    _: any,
    { user }: UserInputType,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(user.email);

    if (!isEmail)
      return {
        userErrors: [{ message: "Please enter a valid email address" }],
        user: null,
        token: null,
      };

    const isValidPassword = validator.isLength(user.password, { min: 5 });

    if (!isValidPassword)
      return {
        userErrors: [{ message: "Password must be at least 5 characters" }],
        user: null,
        token: null,
      };

    if (!user.name || !user.bio)
      return {
        userErrors: [{ message: "Name and Bio are required" }],
        user: null,
        token: null,
      };

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    const token = await JWT.sign(
      {
        userId: newUser.id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      userErrors: [],
      token,
      user: null,
    };
  },
};
