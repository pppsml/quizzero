import { Request, Response } from "express";
import { SessionData } from "express-session";

export interface IContext {
  req: Request;
  res: Response;
  user: SessionData['user'] | null
}