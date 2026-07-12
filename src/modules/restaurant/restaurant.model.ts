import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {

    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String, required: true },

    address: { type: String, required: true },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: { type: Boolean, default: false },

    openingHours: { type: String, default: "09:00" },

    closingHours: { type: String, default: "23:00" },
  },
  { timestamps: true },
);

export const RestaurantModel = mongoose.model(
  "Restaurant",
  restaurantSchema,
);