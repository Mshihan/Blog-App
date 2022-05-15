import { JWT_SECRET } from "../keys";
import JWT from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, JWT_SECRET) as {
      userId: number;
    };
  } catch (error) {
    return null;
  }
};
