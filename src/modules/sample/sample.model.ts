import { Schema, model, Document } from 'mongoose';

export enum SampleType {
  standard = 'Standard',
  advance = 'Advance',
  adhoc = 'adhoc'
}

export enum SampleStatus {
  collect = 'Collect',
  sendHq = 'Send HQ',
  receiveHq = 'Receive HQ',
  sendLab = 'Send Lab',
  receiveLab = 'Receive Lab',
  tested = 'Tested',
  reject = 'Reject'
}

export enum SampleCondition {
  good = 'Baik',
  bad = 'Buruk',
  notFound = 'Tidak Ditemukan',
  untested = '-'
}

export interface ISampleBase {
  sampleId: string;
  distributor: string;
  customer: string;
  lubricantLife: number;
  equipmentLife: number;
  drawnDate: Date;
  topUpVolume: number;
  sampleType: string;
}

export interface IsampleExtended extends ISampleBase {
  status: string;
  isReRegister: boolean;
}

export interface ISampleDocument extends Document, IsampleExtended {}

const SampleSchema = new Schema({
  sampleId: {
    type: String,
    required: true
  },
  distributor: String,
  customer: String,
  lubricantLife: Number,
  equipmentLife: Number,
  drawnDate: Date,
  topUpVolume: Number,
  sampleType: String,
  status: {
    type: String,
    default: SampleStatus.collect
  },
  isReRegister: {
    type: Boolean,
    default: false
  },
  province: String,
  area: String,
  urgent: Boolean,
  allocation: String,
  condition: {
    type: String,
    default: SampleCondition.untested
  }
});

const Sample = model<ISampleDocument>('Sample', SampleSchema);

export default Sample;
