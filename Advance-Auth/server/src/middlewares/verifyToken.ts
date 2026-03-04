import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as { userId: string };

  req.userId = decoded.userId;

  next();
};

export default verifyToken;