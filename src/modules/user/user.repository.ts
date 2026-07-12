import { UserModel, IUserDocument } from "./user.model";

type FilterQuery<T> = Partial<T>;
type UpdateQuery<T> = Partial<T>;

export class UserRepository {

  static async create(data: Partial<IUserDocument>) {
    return UserModel.create(data);
  }

  static async findById(id: string) {
    return UserModel.findById(id);
  }

  static async findByEmail(email?: string) {
    if (!email) return null;

    return UserModel.findOne({ email });
  }

  static async findByPhone(phone?: string) {
    if (!phone) return null;

    return UserModel.findOne({ phone });
  }

  static async findByEmailOrPhone(email?: string, phone?: string) {
    const or: FilterQuery<IUserDocument>[] = [];

    if (email) or.push({ email });
    if (phone) or.push({ phone });

    if (or.length === 0) return null;

    return UserModel.findOne({ $or: or });
  }

  static async updateById(
    id: string,
    data: UpdateQuery<IUserDocument>,
  ) {
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async verifyUser(id: string) {
    return UserModel.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true },
    );
  }

  static async updatePassword(id: string, password: string) {
    return UserModel.findByIdAndUpdate(
      id,
      { password },
      { new: true },
    );
  }

  static async deleteById(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}