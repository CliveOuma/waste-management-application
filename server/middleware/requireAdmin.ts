import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Admin middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized access. Please log in." });
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Admin role required." });
  }

  next();
};
