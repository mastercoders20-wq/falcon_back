import { z } from "zod";

export const createRestaurantSchema = z.object({
  name: z.string().min(2, "اسم المطعم مطلوب"),

  email: z.string().email("الإيميل غير صحيح"),

  phone: z.string().min(8, "رقم الهاتف غير صالح"),

  address: z.string().min(5, "العنوان مطلوب"),

  openingHours: z.string().optional(),
  closingHours: z.string().optional(),
});
export const updateRestaurantSchema = z
  .object({
    name: z.string().min(2, "اسم المطعم قصير جداً").optional(),

    email: z.string().email("الإيميل غير صحيح").optional(),

    phone: z.string().min(8, "رقم الهاتف غير صالح").optional(),

    address: z.string().min(5, "العنوان قصير جداً").optional(),

    description: z.string().optional(),

    logo: z.string().optional(),

    coverImage: z.string().optional(),

    openingHours: z.string().optional(),

    closingHours: z.string().optional(),

    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "يجب تعديل حقل واحد على الأقل",
  });
