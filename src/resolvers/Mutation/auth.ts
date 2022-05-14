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

interface LoginInputType {
  user: { email: string; password: string };
}

interface AuthPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const auth = {
  signup: async (
    _: any,
    { user }: UserInputType,
    { prisma }: Context
  ): Promise<AuthPayload> => {
    const isEmail = validator.isEmail(user.email);

    if (!isEmail)
      return {
        userErrors: [{ message: "Please enter a valid email address" }],
        token: null,
      };

    const isValidPassword = validator.isLength(user.password, { min: 5 });

    if (!isValidPassword)
      return {
        userErrors: [{ message: "Password must be at least 5 characters" }],
        token: null,
      };

    if (!user.name || !user.bio)
      return {
        userErrors: [{ message: "Name and Bio are required" }],
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

    const profile = await prisma.profile.create({
      data: {
        bio: user.bio,
        userId: newUser.id,
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
    };
  },
  signin: async (
    _: any,
    { user }: LoginInputType,
    { prisma }: Context
  ): Promise<AuthPayload> => {
    const { email, password } = user;

    const resultUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!resultUser)
      return {
        userErrors: [
          { message: "Please check your credentials and try again" },
        ],
        token: null,
      };

    const isPasswordMatch = await bcrypt.compare(password, resultUser.password);

    if (!isPasswordMatch)
      return {
        userErrors: [
          { message: "Please check your credentials and try again" },
        ],
        token: null,
      };

    return {
      userErrors: [],
      token: JWT.sign({ userId: resultUser.id }, JWT_SECRET, {
        expiresIn: "1h",
      }),
    };
  },
};
