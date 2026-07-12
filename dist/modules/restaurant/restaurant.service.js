"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const restaurant_repository_1 = require("./restaurant.repository");
const restaurant_validation_1 = require("./restaurant.validation");
const validate_1 = require("../../core/utils/validate");
const AppError_1 = __importDefault(require("../../core/errors/AppError"));
class RestaurantService {
    static async createRestaurant(data, ownerId) {
        const input = (0, validate_1.validate)(restaurant_validation_1.createRestaurantSchema, data);
        const exists = await restaurant_repository_1.RestaurantRepository.findByOwner(ownerId);
        if (exists) {
            throw new AppError_1.default("هذا المستخدم لديه مطعم بالفعل", 409);
        }
        return restaurant_repository_1.RestaurantRepository.create({
            ...input,
            ownerId,
            isActive: false,
        });
    }
    static async getAllRestaurants() {
        return restaurant_repository_1.RestaurantRepository.findAll();
    }
    static async getRestaurantById(id) {
        const restaurant = await restaurant_repository_1.RestaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError_1.default("المطعم غير موجود", 404);
        }
        return restaurant;
    }
    static async updateRestaurant(id, data) {
        const input = (0, validate_1.validate)(restaurant_validation_1.updateRestaurantSchema, data);
        const restaurant = await restaurant_repository_1.RestaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError_1.default("المطعم غير موجود", 404);
        }
        return restaurant_repository_1.RestaurantRepository.update(id, input);
    }
    static async deleteRestaurant(id) {
        const restaurant = await restaurant_repository_1.RestaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError_1.default("المطعم غير موجود", 404);
        }
        return restaurant_repository_1.RestaurantRepository.update(id, {
            isActive: false,
        });
    }
    static async toggleStatus(id) {
        const restaurant = await restaurant_repository_1.RestaurantRepository.findById(id);
        if (!restaurant) {
            throw new AppError_1.default("المطعم غير موجود", 404);
        }
        return restaurant_repository_1.RestaurantRepository.update(id, {
            isActive: !restaurant.isActive,
        });
    }
}
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map