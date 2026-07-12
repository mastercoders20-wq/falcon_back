"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    ownerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isActive: { type: Boolean, default: false },
    openingHours: { type: String, default: "09:00" },
    closingHours: { type: String, default: "23:00" },
}, { timestamps: true });
exports.RestaurantModel = mongoose_1.default.model("Restaurant", restaurantSchema);
//# sourceMappingURL=restaurant.model.js.map