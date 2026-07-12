export interface FieldError {
  field: string;
  message: string;
}
export type UserRole = "customer" | "driver" | "restaurant" | "admin";

export interface IUser {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
