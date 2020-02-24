import { Model, Document, Types } from 'mongoose';

type SupportedId = Types.ObjectId | string;

export default class BaseRepository<T extends Document, CreateParam> {
  _model: Model<T>;
  _identifier: string;

  constructor(model: Model<T>, identifier = '_id') {
    this._model = model;
    this._identifier = identifier;
  }

  async findAll() {
    return this._model.find({});
  }

  async find(condition: any) {
    return this._model.find(condition);
  }

  async removeAll() {
    return this._model.remove({});
  }

  async remove(condition: any) {
    return this._model.remove(condition);
  }

  async findById(id: SupportedId) {
    this._model.find({
      [this._identifier]: id
    });
  }

  async removeById(id: SupportedId) {
    return this._model.remove({
      [this._identifier]: id
    });
  }

  async update(condition: any, data: Partial<T>) {
    return this._model.update(condition, data);
  }

  async updateById(id: SupportedId, data: Partial<T>) {
    return this._model.update(
      {
        [this._identifier]: id
      },
      data
    );
  }

  async create(param: CreateParam) {
    return this._model.create(param);
  }

  async findOne(condition: any) {
    return this._model.findOne(condition);
  }
}
