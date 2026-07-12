import mongoose from "mongoose";
import { env } from "../config/env";
import "../modules/user/user.model";
import "../modules/restaurant/restaurant.model";

export const connectDatabase = async () => {
  await mongoose.connect(env.MONGO_URI);
  await Promise.all(
    Object.values(mongoose.models).map((model) => model.createCollection()),
  );
  console.log("MongoDB connected");
};
