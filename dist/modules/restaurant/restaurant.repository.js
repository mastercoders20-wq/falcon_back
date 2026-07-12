"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRepository = void 0;
const restaurant_model_1 = require("./restaurant.model");
class RestaurantRepository {
    static async create(data) {
        return restaurant_model_1.RestaurantModel.create(data);
    }
    static async findAll() {
        return restaurant_model_1.RestaurantModel.find().populate("ownerId", "name email phone");
    }
    static async findById(id) {
        return restaurant_model_1.RestaurantModel.findById(id);
    }
    static async findByOwner(ownerId) {
        return restaurant_model_1.RestaurantModel.findOne({ ownerId });
    }
    static async update(id, data) {
        return restaurant_model_1.RestaurantModel.findByIdAndUpdate(id, data, { new: true });
    }
    static async delete(id) {
        return restaurant_model_1.RestaurantModel.findByIdAndDelete(id);
    }
}
exports.RestaurantRepository = RestaurantRepository;
//# sourceMappingURL=restaurant.repository.js.map