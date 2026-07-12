import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "../../shared/types";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },

    email: { type: String, unique: true, sparse: true },

    phone: { type: String, unique: true, sparse: true },

    password: { type: String, required: true },

    isVerified: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["customer", "driver", "restaurant", "admin"],
      required: true,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
