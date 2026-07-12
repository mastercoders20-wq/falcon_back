import { RestaurantRepository } from "./restaurant.repository";
import { createRestaurantSchema, updateRestaurantSchema } from "./restaurant.validation";
import { validate } from "../../core/utils/validate";
import AppError from "../../core/errors/AppError";

export class RestaurantService {

  static async createRestaurant(data: any, ownerId: string) {
    const input = validate(createRestaurantSchema, data);

    const exists = await RestaurantRepository.findByOwner(ownerId);

    if (exists) {
      throw new AppError("هذا المستخدم لديه مطعم بالفعل", 409);
    }

    return RestaurantRepository.create({
      ...input,
      ownerId,
      isActive: false,
    });
  }

  static async getAllRestaurants() {
    return RestaurantRepository.findAll();
  }

  static async getRestaurantById(id: string) {
    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("المطعم غير موجود", 404);
    }

    return restaurant;
  }

  static async updateRestaurant(id: string, data: any) {
    const input = validate(updateRestaurantSchema, data);

    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("المطعم غير موجود", 404);
    }

    return RestaurantRepository.update(id, input);
  }

  static async deleteRestaurant(id: string) {
    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("المطعم غير موجود", 404);
    }

    return RestaurantRepository.update(id, {
      isActive: false,
    });
  }

  static async toggleStatus(id: string) {
    const restaurant = await RestaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError("المطعم غير موجود", 404);
    }

    return RestaurantRepository.update(id, {
      isActive: !restaurant.isActive,
    });
  }
}