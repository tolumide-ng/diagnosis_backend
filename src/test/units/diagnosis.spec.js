/**
 * @jest-environment node
 */

import { createDiagnosis, modifyDiagnosis, getSpecificDiagnosis } from '../../validators/diagnosis.validator';
import { createDiagnosis as diagnosisExample, Response } from '../utils';


const next = jest.fn();
let req;


describe('The createDiagnosis validator', () => {
  beforeEach(async () => {
    req = { body: await diagnosisExample() };
  });
  it('should call the next function if validation suceeds', async () => {
    const res = new Response();
    const statusSpy = jest.spyOn(res, 'status');
    await createDiagnosis(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(statusSpy).not.toHaveBeenCalled();
  });

  it('should return validation error if validation fails', async () => {
    const res = new Response();
    req.body.categoryCode = '';
    const statusSpy = jest.spyOn(res, 'status');
    const bodySpy = jest.spyOn(res, 'send');


    await createDiagnosis(req, res, next);

    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(bodySpy).toHaveBeenCalledWith({ message: [{ field: 'categoryCode', message: 'categoryCode is required', validation: 'required' }] });
  });
});


describe('The modifyDiagnosis validator', () => {
  beforeEach(async () => {
    req = { body: await diagnosisExample() };
  });

  it('should call the next function if validation suceeds', async () => {
    const res = new Response();
    const statusSpy = jest.spyOn(res, 'status');
    await modifyDiagnosis(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(statusSpy).not.toHaveBeenCalled();
  });

  it('should not return validation error when any input is missing', async () => {
    const res = new Response();
    req.body.categoryCode = '';
    req.body.fullCode = '';
    const statusSpy = jest.spyOn(res, 'status');
    const bodySpy = jest.spyOn(res, 'send');


    await modifyDiagnosis(req, res, next);

    expect(statusSpy).not.toHaveBeenCalled();
    expect(bodySpy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});


describe('The getSpecificDiagnosis validator', () => {
  it('should call the next function if validation suceeds', async () => {
    req = { params: { id: 4 } };
    const res = new Response();
    const statusSpy = jest.spyOn(res, 'status');
    await getSpecificDiagnosis(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(statusSpy).not.toHaveBeenCalled();
  });

  it('should return validation error when the required parameter is missing', async () => {
    const res = new Response();
    req = { params: { id: 'abc' } };
    const statusSpy = jest.spyOn(res, 'status');
    const bodySpy = jest.spyOn(res, 'send');


    await getSpecificDiagnosis(req, res, next);
    expect(statusSpy).toHaveBeenCalledWith(400);
    expect(bodySpy).toHaveBeenCalledWith({ message: [{ field: 'id', message: 'number validation failed on id', validation: 'number' }] });
  });
});
