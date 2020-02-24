import { Model } from 'mongoose';
import Sample, { ISampleDocument, ISampleBase } from './sample.model';
import BaseRepository from '../../repository/baseRepository';

export default class SampleRepository extends BaseRepository<
  ISampleDocument,
  ISampleBase
> {
  _sampleModel: Model<ISampleDocument>;

  constructor() {
    super(Sample);
    this._sampleModel = Sample;
  }
}
