"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
require("../modules/user/user.model");
require("../modules/restaurant/restaurant.model");
const connectDatabase = async () => {
    await mongoose_1.default.connect(env_1.env.MONGO_URI);
    await Promise.all(Object.values(mongoose_1.default.models).map((model) => model.createCollection()));
    console.log("MongoDB connected");
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.js.map