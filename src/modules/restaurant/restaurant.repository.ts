import { RestaurantModel } from "./restaurant.model";

export class RestaurantRepository {
  static async create(data: any) {
    return RestaurantModel.create(data);
  }

  static async findAll() {
    return RestaurantModel.find().populate("ownerId", "name email phone");
  }

  static async findById(id: string) {
    return RestaurantModel.findById(id);
  }

  static async findByOwner(ownerId: string) {
    return RestaurantModel.findOne({ ownerId });
  }

  static async update(id: string, data: any) {
    return RestaurantModel.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    return RestaurantModel.findByIdAndDelete(id);
  }
}