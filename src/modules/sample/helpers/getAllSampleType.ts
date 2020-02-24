import { SampleType } from '../sample.model';

export default function getAllSampleKey(): any[] {
  return Object.keys(SampleType);
}
