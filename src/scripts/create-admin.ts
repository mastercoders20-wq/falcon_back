import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDatabase } from "../core/database";
import { UserModel } from "../modules/user/user.model";
import { env } from "../config/env";
dotenv.config();

async function createAdmin() {
  try {
    await connectDatabase();

    const exists = await UserModel.findOne({
      role: "admin",
    });

    if (exists) {
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD!, 12);

    await UserModel.create({
      name: "System Admin",
      email: env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });


    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
