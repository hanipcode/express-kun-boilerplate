import User, { IUserModel, IUser } from './user.model';
import mongoose from 'mongoose';

export default class UserRepository {
  _userModel: mongoose.Model<IUserModel>;

  constructor() {
    this._userModel = User;
  }

  async createUser(param: Partial<IUser>) {
    return this._userModel.create(param);
  }

  async findAllUser() {
    return this._userModel.find({});
  }

  async findOneUser(condition: any) {
    return this._userModel.findOne(condition);
  }

  async findOneUserWithPassword(condition: any) {
    return this._userModel.findOne(condition).select('_id email name password');
  }
}
