import { Request, Response } from 'express';
import * as yup from 'yup';
import validationWording from '../../constants/validationWording';
import SampleRepository from './sample.repository';

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
    sampleType: yup.string().required(validationWording.required('sampleType'))
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
