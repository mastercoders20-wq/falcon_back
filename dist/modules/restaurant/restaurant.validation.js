"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRestaurantSchema = exports.createRestaurantSchema = void 0;
const zod_1 = require("zod");
exports.createRestaurantSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "اسم المطعم مطلوب"),
    email: zod_1.z.string().email("الإيميل غير صحيح"),
    phone: zod_1.z.string().min(8, "رقم الهاتف غير صالح"),
    address: zod_1.z.string().min(5, "العنوان مطلوب"),
    openingHours: zod_1.z.string().optional(),
    closingHours: zod_1.z.string().optional(),
});
exports.updateRestaurantSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(2, "اسم المطعم قصير جداً").optional(),
    email: zod_1.z.string().email("الإيميل غير صحيح").optional(),
    phone: zod_1.z.string().min(8, "رقم الهاتف غير صالح").optional(),
    address: zod_1.z.string().min(5, "العنوان قصير جداً").optional(),
    description: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    coverImage: zod_1.z.string().optional(),
    openingHours: zod_1.z.string().optional(),
    closingHours: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "يجب تعديل حقل واحد على الأقل",
});
//# sourceMappingURL=restaurant.validation.js.map