import { Request, Response, NextFunction } from "express";
import { RestaurantService } from "./restaurant.service";

export class RestaurantController {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const restaurant = await RestaurantService.createRestaurant(
        req.body,
        (req as any).user.id,
      );

      return res.status(201).json({
        success: true,
        data: restaurant,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await RestaurantService.getAllRestaurants();

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await RestaurantService.getRestaurantById(id);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await RestaurantService.updateRestaurant(id, req.body);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await RestaurantService.deleteRestaurant(id);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async toggle(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await RestaurantService.toggleStatus(id);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }
}
