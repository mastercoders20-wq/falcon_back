"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("./user.model");
class UserRepository {
    static async create(data) {
        return user_model_1.UserModel.create(data);
    }
    static async findById(id) {
        return user_model_1.UserModel.findById(id);
    }
    static async findByEmail(email) {
        if (!email)
            return null;
        return user_model_1.UserModel.findOne({ email });
    }
    static async findByPhone(phone) {
        if (!phone)
            return null;
        return user_model_1.UserModel.findOne({ phone });
    }
    static async findByEmailOrPhone(email, phone) {
        const or = [];
        if (email)
            or.push({ email });
        if (phone)
            or.push({ phone });
        if (or.length === 0)
            return null;
        return user_model_1.UserModel.findOne({ $or: or });
    }
    static async updateById(id, data) {
        return user_model_1.UserModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    static async verifyUser(id) {
        return user_model_1.UserModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
    }
    static async updatePassword(id, password) {
        return user_model_1.UserModel.findByIdAndUpdate(id, { password }, { new: true });
    }
    static async deleteById(id) {
        return user_model_1.UserModel.findByIdAndDelete(id);
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map