import { Request, Response } from 'express';
import * as yup from 'yup';
import validationWording from '../../constants/validationWording';
import SampleRepository from './sample.repository';
import Sample, { SampleType } from './sample.model';
import getAllSampleKey from './helpers/getAllSampleType';

export const create = async (req: Request, res: Response) => {
  const validation = yup.object().shape({
    sampleId: yup.string().required(validationWording.required('sampleId')),
    distributor: yup
      .string()
      .required(validationWording.required('distributor')),
    customer: yup.string().required(validationWording.required('customer')),
    lubricantLife: yup
      .number()
      .required(validationWording.required('lubricantLife')),
    equipmentLife: yup
      .number()
      .required(validationWording.required('equipmentLife')),
    drawnDate: yup.date().required(validationWording.required('drawnDate')),
    topUpVolume: yup
      .number()
      .required(validationWording.required('topUpVolume')),
    sampleType: yup
      .mixed<keyof typeof SampleType>()
      .oneOf(
        getAllSampleKey(),
        validationWording.oneOf('sampleType', ...getAllSampleKey())
      )
      .required(validationWording.required('sampleType'))
  });

  const validatedBody = validation.validateSync(req.body);
  const sampleRepository = new SampleRepository();

  const sampleItem = await sampleRepository.create({
    sampleId: validatedBody.sampleId,
    distributor: validatedBody.distributor,
    customer: validatedBody.customer,
    lubricantLife: validatedBody.lubricantLife,
    equipmentLife: validatedBody.equipmentLife,
    drawnDate: validatedBody.drawnDate,
    topUpVolume: validatedBody.topUpVolume,
    sampleType: validatedBody.sampleType
  });

  res.json({
    message: 'Successfully create sample',
    data: sampleItem
  });
};

export const getAll = async (req: Request, res: Response) => {
  const sampleRepository = new SampleRepository();
  const samples = await sampleRepository.findAll();

  res.json({
    message: 'successfully get all sample',
    data: samples
  });
};

export const deleteById = async (req: Request, res: Response) => {
  const paramValidation = yup.object().shape({
    sampleId: yup.string().required(validationWording.required('sampleId'))
  });
  const validatedParam = paramValidation.validateSync(req.params);

  const sampleRepository = new SampleRepository();

  await sampleRepository.removeById(validatedParam.sampleId);

  res.json({
    message: 'successfully delete sample',
    data: {
      _id: validatedParam.sampleId
    }
  });
};
