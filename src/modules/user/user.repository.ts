import User, { IUserModel, IUserBase } from './user.model';
import mongoose from 'mongoose';
import BaseRepository from '../../repository/baseRepository';

type CreateUserParam = IUserBase;

export default class UserRepository extends BaseRepository<
  IUserModel,
  CreateUserParam
> {
  _userModel: mongoose.Model<IUserModel>;

  constructor() {
    super(User);
    this._userModel = User;
  }

  async findOneUserWithPassword(condition: any) {
    return this._userModel.findOne(condition).select('_id email name password');
  }
}
