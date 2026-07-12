"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_service_1 = require("./restaurant.service");
class RestaurantController {
    static async create(req, res, next) {
        try {
            const restaurant = await restaurant_service_1.RestaurantService.createRestaurant(req.body, req.user.id);
            return res.status(201).json({
                success: true,
                data: restaurant,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getAll(req, res, next) {
        try {
            const data = await restaurant_service_1.RestaurantService.getAllRestaurants();
            return res.json({
                success: true,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async getById(req, res, next) {
        try {
            const id = req.params.id;
            const data = await restaurant_service_1.RestaurantService.getRestaurantById(id);
            return res.json({
                success: true,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async update(req, res, next) {
        try {
            const id = req.params.id;
            const data = await restaurant_service_1.RestaurantService.updateRestaurant(id, req.body);
            return res.json({
                success: true,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async delete(req, res, next) {
        try {
            const id = req.params.id;
            const data = await restaurant_service_1.RestaurantService.deleteRestaurant(id);
            return res.json({
                success: true,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    }
    static async toggle(req, res, next) {
        try {
            const id = req.params.id;
            const data = await restaurant_service_1.RestaurantService.toggleStatus(id);
            return res.json({
                success: true,
                data,
            });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.RestaurantController = RestaurantController;
//# sourceMappingURL=restaurant.controller.js.map