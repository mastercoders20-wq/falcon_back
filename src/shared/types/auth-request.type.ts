import { Request } from "express";
import { IUserDocument } from "../../modules/user/user.model";

export interface AuthRequest extends Request {
  user?: IUserDocument;
}